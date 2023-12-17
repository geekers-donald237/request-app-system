<?php

namespace App\Services;

use App\Commands\SaveRequestActionCommand;
use App\Enums\RuleEnum;
use App\Enums\StorageDirectoryEnum;
use App\Helpers\HelpersFunction;
use App\Models\Attachment;
use App\Models\Request;
use App\Models\RequestPattern;
use App\Models\User;
use App\Responses\DeleteRequestResponse;
use App\Responses\GetUserRequestsResponse;
use App\Responses\saveRequestActionResponse;
use Exception;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Support\Facades\Auth;

class RequestService
{
    /**
     * @throws Exception
     */
    public function handleSaveRequest(SaveRequestActionCommand $command): saveRequestActionResponse
    {
        $response = new saveRequestActionResponse();
        $this->checkIfAuthenticateUserIsStudentOrThrowException();
        $this->checkIfRequestPatternExistOrThrowException($command->requestPatternId);

        $request = $this->saveUserRequest($command);
        $response->isSaved = true;
        $response->requestId = $request->id;
        $response->message = 'Request Successfully saved';

        return $response;
    }

    /**
     * @throws Exception
     */
    public function handleGetUserRequests(string $userId): GetUserRequestsResponse
    {
        $response = new GetUserRequestsResponse();
        $user = $this->getUserIfExistOrThrowException($userId);
        $response->requests = $user->requests()->whereIsDeleted(false)->with('attachments')->get();
        $response->message = 'Requests of ' . $user->name();
        return $response;
    }

    /**
     * @throws Exception
     */
    public function handleDeleteRequest(string $requestId): DeleteRequestResponse
    {
        $response = new DeleteRequestResponse();
        $request = $this->getRequestIfExistOrThrowException($requestId);
        $this->checkIfAuthUserIsOwnerRequestOrThrowException(Auth::user(), $request);
        $this->deleteRequestAndItsAttachments($request);

        $response->isDeleted = true;
        $response->message = 'Deleted Request and its attachments successful';
        return $response;
    }

    /**
     * @throws Exception
     */
    private function checkIfAuthenticateUserIsStudentOrThrowException(): void
    {
        $authUserRules = Auth::user()->rules()->pluck('name')->toArray();
        if (!in_array(RuleEnum::STUDENT->value, $authUserRules)) {
            throw new Exception('This user is not a student, so he cannot create a request');
        }
    }

    /**
     * @throws Exception
     */
    private function checkIfRequestPatternExistOrThrowException(int $requestPatternId): void
    {
        $existingRequestPattern = RequestPattern::whereId($requestPatternId)->whereIsDeleted(false)->first();

        if (is_null($existingRequestPattern)) {
            throw new Exception('Request pattern does not exist');
        }
    }

    /**
     * @param SaveRequestActionCommand $command
     * @return Request
     * @throws Exception
     */
    private function saveUserRequest(SaveRequestActionCommand $command): Request
    {
        $request = $this->saveRequest($command);

        $this->saveFileHandWritten($command, $request);

        $this->saveFileAttachments($command->fileAttachments, $request);

        $this->associateRequestWithReceivers($request, $command->receiverIds);

        return $request;
    }


    /**
     * @param SaveRequestActionCommand $command
     * @return Request
     */
    private function saveRequest(SaveRequestActionCommand $command): Request
    {
        $request = new Request();
        $dataToSave = $this->buildRequestData($command);
        $request->fill($dataToSave)->save();
        return $request;
    }

    private function buildRequestData(SaveRequestActionCommand $command): array
    {
        return [
            'sender_id' => Auth::user()->getAuthIdentifier(),
            'request_pattern_id' => $command->requestPatternId,
            'title' => $command->title,
            'content' => $command->content
        ];
    }

    /**
     * @param SaveRequestActionCommand $command
     * @param Request $request
     * @return void
     * @throws Exception
     */
    private function saveFileHandWritten(SaveRequestActionCommand $command, Request $request): void
    {
        $attachment = new Attachment();
        $fileName = HelpersFunction::handleFileUpload($command->fileHandWrite, StorageDirectoryEnum::FileHandWritten->value);
        $handWrittenData = $this->buildAttachmentData($fileName, $request, true);

        $attachment->fill($handWrittenData)->save();

    }


    /**
     * @param string $fileName
     * @param Request $request
     * @param bool $isHandWritten
     * @return array
     */
    private function buildAttachmentData(string $fileName, Request $request, bool $isHandWritten): array
    {
        return [
            'file_path' => $fileName,
            'request_id' => $request->id,
            'is_handwritten' => $isHandWritten
        ];

    }

    /**
     * @throws Exception
     */
    private function saveFileAttachments(?array $attachments, Request $request): void
    {
        if (is_null($attachments)) {
            return;
        }
        foreach ($attachments as $attachment) {

            $attachmentModel = new Attachment();

            $fileName = HelpersFunction::handleFileUpload(
                $attachment,
                StorageDirectoryEnum::FileAttachement->value
            );

            $attachmentData = $this->buildAttachmentData($fileName, $request, false);
            $attachmentModel->fill($attachmentData)->save();

        }
    }

    private function associateRequestWithReceivers(Request $request, array $receiverIds): void
    {
        $request->receivers()->attach($receiverIds);
    }

    /**
     * @param Request $request
     * @return void
     */
    private function deleteRequestAndItsAttachments(Request $request): void
    {
        $request->attachments()->delete();
        $request->fill(['is_deleted' => true])->save();
    }

    /**
     * Créer une nouvelle instance de ReceiverRequest avec les données spécifiées.
     *
     * @param int $requestId
     * @param int $receiverId
     * @return array
     */


    private function createReceiverRequest(int $requestId, int $receiverId): array
    {
        return [
            'request_id' => $requestId,
            'receiver_id' => $receiverId,
        ];

    }

    /**
     * @throws Exception
     */
    private function getUserIfExistOrThrowException(string $userId): User
    {
        $user = User::whereId($userId)->whereIsDeleted(false)->first();
        if (is_null($user)) {
            throw new Exception('Cet utilisateur n\'existe pas!');
        }
        return $user;
    }

    /**
     * @throws Exception
     */
    private function getRequestIfExistOrThrowException(string $requestId): Request
    {
        $request = Request::whereId($requestId)->whereIsDeleted(false)->first();
        if (is_null($request)) {
            throw new Exception('Cette requête n\'existe pas !');
        }

        return $request;
    }

    /**
     * @throws Exception
     */
    private function checkIfAuthUserIsOwnerRequestOrThrowException(Authenticatable $user, Request $request): void
    {
        if ($request->sender()->getForeignKeyName() === $user->getAuthIdentifier()) {
            return;
        }
        throw new Exception('Vous n\êtes pas autorisé à supprimer cette requête');
    }


}
