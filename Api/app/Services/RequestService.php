<?php

namespace App\Services;

use App\Commands\SaveRequestActionCommand;
use App\Commands\SendRequestActionCommand;
use App\Enums\RuleEnum;
use App\Enums\StorageDirectoryEnum;
use App\Helpers\HelpersFunction;
use App\Models\Attachment;
use App\Models\Request;
use App\Models\RequestPattern;
use App\Models\Student;
use App\Responses\DeleteRequestActionResponse;
use App\Responses\GetUserRequestsActionResponse;
use App\Responses\saveRequestActionResponse;
use App\Responses\SendRequestActionResponse;
use Exception;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Collection;
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

        $request = $this->saveStudentRequest($command);
        $response->isSaved = true;
        $response->requestId = $request->getAttributeValue('id');
        $response->message = 'Request Successfully saved';

        return $response;
    }

    /**
     * @throws Exception
     */
    public function handleGetStudentRequests(string $studentId): GetUserRequestsActionResponse
    {
        $response = new GetUserRequestsActionResponse();
        $this->checkIfAuthenticateUserIsStudentOrThrowException();
        $student = $this->getStudentIfExistOrThrowException($studentId);
        $response->requests = $student->requests()->whereIsDeleted(false)->with('attachments')->with('receivers')->get();
        $response->message = 'Requests of ' . $student->user()->first()->name();
        return $response;
    }

    /**
     * @throws Exception
     */
    public function handleDeleteRequest(string $requestId): DeleteRequestActionResponse
    {
        $response = new DeleteRequestActionResponse();
        $request = $this->getRequestIfExistOrThrowException($requestId);
        //$this->checkIfAuthUserIsOwnerRequestOrThrowException(Auth::user(), $request);
        $this->deleteRequestAndItsAttachments($request);

        $response->isDeleted = true;
        $response->message = 'Deleted Request and its attachments successful';
        return $response;
    }


    /**
     * @throws Exception
     */
    public function handleSendRequest(SendRequestActionCommand $command): SendRequestActionResponse
    {
        $response = new SendRequestActionResponse();
        $this->checkIfAuthenticateUserIsStudentOrThrowException();
        $request = $this->getRequestIfExistOrThrowException($command->requestId);
        foreach ($command->receiverIds as $receiverId) {
            $this->getStudentIfExistOrThrowException($receiverId);
        }
        $request->receivers()->attach($command->receiverIds);
        $response->isSaved = true;
        $response->message = 'Send request successfully !';

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
    private function saveStudentRequest(SaveRequestActionCommand $command): Request
    {
        $request = $this->saveRequest($command);

        $this->saveFileHandWritten($command, $request);

        $this->saveFileAttachments($command->fileAttachments, $request);

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
            'sender_id' => Student::whereUserId(Auth::user()->getAuthIdentifier())->first()->id,
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
        $filePath = HelpersFunction::handleFileUpload($command->fileHandWritten, StorageDirectoryEnum::FileHandWritten->value);
        $handWrittenData = $this->buildAttachmentData($filePath, $request, true);

        $attachment->fill($handWrittenData)->save();

    }


    /**
     * @param string $filePath
     * @param Request $request
     * @param bool $isHandWritten
     * @return array
     */
    private function buildAttachmentData(string $filePath, Request $request, bool $isHandWritten): array
    {
        return [
            'file_path' => $filePath,
            'request_id' => $request->getAttributeValue('id'),
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

            $filePath = HelpersFunction::handleFileUpload(
                $attachment,
                StorageDirectoryEnum::FileAttachment->value
            );

            $attachmentData = $this->buildAttachmentData($filePath, $request, false);
            $attachmentModel->fill($attachmentData)->save();

        }
    }

    /**
     * @param Request $request
     * @return void
     */
    private function deleteRequestAndItsAttachments(Request $request): void
    {
        $this->removeAttachmentsFromDisk($request->attachments()->get());
        $request->attachments()->delete();
        $request->fill(['is_deleted' => true])->save();
    }

    /**
     * @throws Exception
     */
    private function getStudentIfExistOrThrowException(string $studentId): Student
    {
        $student = Student::whereId($studentId)->whereIsDeleted(false)->first();
        if (is_null($student)) {
            throw new Exception('Cet étudiant n\'existe pas!');
        }
        return $student;
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

    private function removeAttachmentsFromDisk(Collection $attachments): void
    {
        //TODO : implement disk attachments suppression
    }


}
