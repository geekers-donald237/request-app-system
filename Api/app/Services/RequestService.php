<?php

namespace App\Services;

use App\Commands\SaveRequestActionCommand;
use App\Commands\SendRequestActionCommand;
use App\Commands\UpdateRequestActionCommand;
use App\Enums\RequestStateEnum;
use App\Enums\RuleEnum;
use App\Enums\StorageDirectoryEnum;
use App\Helpers\HelpersFunction;
use App\Models\Attachment;
use App\Models\Request;
use App\Models\RequestPattern;
use App\Models\Secretary;
use App\Models\Staff;
use App\Models\Student;
use App\Responses\DeleteRequestActionResponse;
use App\Responses\GetSecretaryRequestActionResponse;
use App\Responses\GetStaffRequestActionResponse;
use App\Responses\GetUserRequestsActionResponse;
use App\Responses\saveRequestActionResponse;
use App\Responses\SendRequestActionResponse;
use App\Responses\UpdateRequestActionResponse;
use App\Responses\UpdateRequestStatutActionResponse;
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
    private function checkIfAuthenticateUserIsStudentOrThrowException(): void
    {
        $authUserRules = Auth::user()->rules()->pluck('name')->toArray();
        if (!in_array(RuleEnum::STUDENT->value, $authUserRules)) {
            throw new Exception('This user is not a student, so he cannot do any action on request');
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
        //TODO: implements event listeners for upload file on disk

//        SaveFileEvent::dispatch($command, $request);
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
     * @throws Exception
     */
    public function handleUpdateRequest(UpdateRequestActionCommand $command): UpdateRequestActionResponse
    {
        $requestId = $command->requestId;
        $response = new UpdateRequestActionResponse();
        $this->checkIfAuthenticateUserIsStudentOrThrowException();
        $request = $this->getRequestIfExistOrThrowException($requestId);
        $this->checkIfAuthUserIsOwnerRequestOrThrowException(Auth::user(), $request);
        $request = $this->updateStudentRequest($requestId, $command);


        $response->request = $request;
        $response->message = 'Request Successfully updated';

        return $response;
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
        if ($request->senderId() == $user->getAuthIdentifier()) {
            return;
        }
        throw new Exception('Vous n\êtes pas autorisé à effectuer une action sur cette requête');
    }

    /**
     * @throws Exception
     */
    private function updateStudentRequest(string $requestId, UpdateRequestActionCommand $command): Request
    {

        $request = $this->updateRequest($requestId, $command);

        $this->UpdateFileHandWritten($command, $request);

        $this->UpdateFileAttachments($command->fileAttachments, $request, $requestId);

        return $request;
    }

    /**
     * @throws Exception
     */
    private function updateRequest(string $requestId, UpdateRequestActionCommand $command): Request
    {
        $this->checkIfAuthenticateUserIsStudentOrThrowException();

        $request = Request::findOrFail($requestId);

        $this->checkIfIsPossibleToModifyRequest($request);

        $dataToUpdate = $this->buildUpdateRequestData($command);
        $request->update($dataToUpdate);

        return $request;
    }

    /**
     * @throws Exception
     */
    private function checkIfIsPossibleToModifyRequest(Request $request): void
    {
        $requestStatutPossibleModified = [RequestStateEnum::ATTENTE_DE_SOUMISSION->value, RequestStateEnum::ATTENTE_DE_VALIDATION->value, RequestStateEnum::REFUSEE->value];
        if (in_array($request->statut(), $requestStatutPossibleModified)) {
            throw new Exception('Impossible de modifier cette requete car en cours de traitement');
        }

    }

    private function buildUpdateRequestData(UpdateRequestActionCommand $command): array
    {
        return [
            'title' => $command->title,
            'content' => $command->content
        ];
    }

    /**
     * @throws Exception
     */
    private function updateFileHandWritten(UpdateRequestActionCommand $command, Request $request): void
    {
        $requestId = $command->requestId;

        Attachment::where('request_id', $requestId)->whereIsHandwritten(true)->delete();

        $attachment = new Attachment();
        $filePath = HelpersFunction::handleFileUpload($command->fileHandWritten, StorageDirectoryEnum::FileHandWritten->value);
        $handWrittenData = $this->buildAttachmentData($filePath, $request, true);

        $attachment->fill($handWrittenData)->save();
    }

    /**
     * @throws Exception
     */
    private function updateFileAttachments(?array $attachments, Request $request, string $requestId): void
    {
        Attachment::where('request_id', $requestId)->whereIsHandwritten(false)->delete();

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
    public function handleGetSecretaryRequests(string $secretaryId): GetSecretaryRequestActionResponse
    {
        $response = new GetSecretaryRequestActionResponse();
        $this->checkIfAuthenticateUserIsSecretaryOrThrowException();
        $secretary = $this->getSecretaryIfExistOrThrowException($secretaryId);

        $response->requests = $secretary->requests()->get();
        $response->message = 'Requetes envoyees ' . $secretary->user->name;

        return $response;
    }



    /**
     * @throws Exception
     */

    /**
     * @throws Exception
     */
    private function checkIfAuthenticateUserIsSecretaryOrThrowException(): void
    {
        $authUserRules = Auth::user()->rules()->pluck('name')->toArray();
        if (!in_array(RuleEnum::SECRETARY->value, $authUserRules)) {
            throw new Exception('This user is not a secretary, so he cannot get request ');
        }
    }

    /**
     * @throws Exception
     */
    private function getSecretaryIfExistOrThrowException(string $secretaryId): Secretary
    {
        $secretary = Secretary::whereId($secretaryId)->whereIsDeleted(false)->first();
        if (is_null($secretary)) {
            throw new Exception('Ce secretaire n\'existe pas!');
        }
        return $secretary;
    }

    /**
     * @throws Exception
     */
    public function handleGetStaffRequests(string $staffId): GetStaffRequestActionResponse
    {
        $this->checkIfAuthenticateUserIsStaffMemberOrThrowException();
        $response = new GetStaffRequestActionResponse();
        $staff = $this->getStaffIfExistOrThrowException($staffId);
        $response->requests = $staff->receiveRequests()->with('attachments')->with('sender')->get();
        $response->message = 'Requests receive by ' . $staff->user()->first()->name();
        return $response;
    }

    /**
     * @throws Exception
     */
    private function checkIfAuthenticateUserIsStaffMemberOrThrowException(): void
    {
        $authUserRules = Auth::user()->rules()->pluck('name')->toArray();
        if (!in_array(RuleEnum::STAFF->value, $authUserRules)) {
            throw new Exception('This user is not a member of staff, so he cannot read a request');
        }
    }

    /**
     * @throws Exception
     */
    private function getStaffIfExistOrThrowException(string $staffId): Staff
    {
        $staff = Staff::whereId($staffId)->whereIsDeleted(false)->first();

        if (is_null($staff)) {
            throw new Exception('Le membre du personnel spécifié n\'existe pas !');
        }
        return $staff;

    }

    /**
     * @throws Exception
     */
    public function handleDeleteRequest(string $requestId): DeleteRequestActionResponse
    {
        $response = new DeleteRequestActionResponse();
        $request = $this->getRequestIfExistOrThrowException($requestId);
        $this->checkIfAuthUserIsOwnerRequestOrThrowException(Auth::user(), $request);
        $this->checkIfIsPossibleTodeleteRequest($request);
        $this->deleteRequestAndItsAttachments($request);

        $response->isDeleted = true;
        $response->message = 'Deleted Request and its attachments successful';
        return $response;
    }

    private function checkIfIsPossibleTodeleteRequest(Request $request): void
    {
        $requestStatutPossibleToDeleted = [RequestStateEnum::ATTENTE_DE_SOUMISSION->value, RequestStateEnum::ATTENTE_DE_VALIDATION->value, RequestStateEnum::REFUSEE->value, RequestStateEnum::ACCEPTEE, RequestStateEnum::TERMINEE];
        if (in_array($request->statut(), $requestStatutPossibleToDeleted)) {
            throw new Exception('Impossible de modifier cette requete car en cours de traitement');
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

    private function removeAttachmentsFromDisk(Collection $attachments): void
    {
        //TODO : implement disk attachments suppression
    }

    /**
     * @throws Exception
     */

    /**
     * @throws Exception
     */
    public function handleSendRequest(SendRequestActionCommand $command): SendRequestActionResponse
    {
        $this->checkIfAuthenticateUserIsStudentOrThrowException();
        $response = new SendRequestActionResponse();
        $request = $this->getRequestIfExistOrThrowException($command->requestId);
        foreach ($command->receiverIds as $receiverId) {
            $this->checkIfReceiverExistOrThrowException($receiverId);
        }
        $request->receivers()->attach($command->receiverIds);
        $this->updateRequestState($request, RequestStateEnum::ATTENTE_DE_VALIDATION);

        $response->isSent = true;
        $response->message = 'Send request successfully !';
        return $response;
    }

    /**
     * @throws Exception
     */
    private function checkIfReceiverExistOrThrowException(string $receiverId): void
    {
        $staff = Staff::whereId($receiverId)->whereIsDeleted(false)->first();
        if (is_null($staff)) {
            throw new Exception('Ce personnel n\'existe pas!');
        }
    }

    /**
     * @throws Exception
     */
    public function updateRequestState(Request $request, RequestStateEnum $newRequestState): void
    {
        $request->fill(['statut' => $newRequestState->value])->save();
    }

    /**
     * @throws Exception
     */
    public function handleUpdateSecretaryRequestStatus(string $requestId, string $newRequestStatut): UpdateRequestStatutActionResponse
    {
        $response = new UpdateRequestStatutActionResponse();
        $request = $this->getRequestIfExistOrThrowException($requestId);
        $this->checkIfNewStateRequestExistInRequestEnumStatut($newRequestStatut);
        $request->update(['statut' => $newRequestStatut]);
        $response->message = 'Statut Updated succeffuly';
        return $response;
    }

    /**
     * @throws Exception
     */
    private function checkIfNewStateRequestExistInRequestEnumStatut(string $newRequestStatut): void
    {
        if (!in_array($newRequestStatut, RequestStateEnum::values())) {
            throw new Exception('Statut Inexistant');
        }
    }


}

