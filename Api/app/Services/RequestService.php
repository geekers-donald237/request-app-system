<?php

namespace App\Services;

use App\Commands\SaveRequestActionCommand;
use App\Commands\SendRequestActionCommand;
use App\Enums\RequestStateEnum;
use App\Enums\RuleEnum;
use App\Enums\StorageDirectoryEnum;
use App\Helpers\HelpersFunction;
use App\Models\Attachment;
use App\Models\Request;
use App\Models\RequestHistory;
use App\Models\RequestPattern;
use App\Models\Rule;
use App\Models\Secretary;
use App\Models\Staff;
use App\Models\Student;
use App\Models\UE;
use App\Models\User;
use App\Responses\DeleteRequestActionResponse;
use App\Responses\GetAllUserActionResponse;
use App\Responses\GetRequestActionResponse;
use App\Responses\GetRequestHistoryActionResponse;
use App\Responses\GetSecretaryRequestActionResponse;
use App\Responses\GetStaffMemberActionResponse;
use App\Responses\GetStaffRequestActionResponse;
use App\Responses\GetStudentDetailsResponse;
use App\Responses\GetStudentInformationActionResponse;
use App\Responses\GetUserRequestsActionResponse;
use App\Responses\saveRequestActionResponse;
use App\Responses\SendRequestActionResponse;
use App\Responses\UpdateRequestStatutActionResponse;
use Carbon\Carbon;
use Exception;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
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
        $this->createRequestHistory($request, RequestStateEnum::ATTENTE_DE_SOUMISSION->value);

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
            'request_code' => HelpersFunction::unique_str(),
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

    private function createRequestHistory(Request $request, string $newRequestState): void
    {
        $requestHistory = new RequestHistory();
        $requestHistory->fill([
            'request_id' => $request->id,
            'modify_by' => Auth::user()->name,
            'status' => $newRequestState,
        ])->save();
    }

    /**
     * @throws Exception
     */
    public function handleGetStudentRequests(string $studentId): GetUserRequestsActionResponse
    {
        $response = new GetUserRequestsActionResponse();
        $this->checkIfAuthenticateUserIsStudentOrThrowException();
        $student = $this->getStudentIfExistOrThrowException($studentId);
        $response->requests = $student->requests()->whereIsDeleted(false)->with('attachments')->with('ues')->get();
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

        $ueIds = $this->getSubjectsIdForSecretary($secretary);

        // Utiliser la méthode personnalisée du modèle Secretary
        $response->requests = $secretary->getRequestsForUes($ueIds)->with('sender')->get();

        $response->message = 'Requetes envoyees ' . $secretary->user->name;

        return $response;
    }

    /**
     * @throws Exception
     */
    public static function checkIfAuthenticateUserIsSecretaryOrThrowException(): void
    {
        $authUserRules = Auth::user()->rules()->pluck('name')->toArray();
        if (!in_array(RuleEnum::SECRETARY->value, $authUserRules)) {
            throw new Exception('This user is not a secretary, so he cannot get request ');
        }
    }

    /**
     * @throws Exception
     */
    public static function getSecretaryIfExistOrThrowException(string $secretaryId): Secretary
    {
        $secretary = Secretary::whereUserId($secretaryId)->whereIsDeleted(false)->first();
        if (is_null($secretary)) {
            throw new Exception('Ce secretaire n\'existe pas!');
        }
        return $secretary;
    }

    public function getSubjectsIdForSecretary($secretary): ?array
    {
        $ueIds = [];

        $department = $secretary->department;
        if ($department) {

            foreach ($department->subjects as $subject) {
                $ueIds[] = $subject['id'];
            }
            return $ueIds;
        } else {
            return null;
        }
    }


    /**
     * @throws Exception
     */

    /**
     * @throws Exception
     */

    public function handleGetStaffRequests(string $staffId): GetStaffRequestActionResponse
    {
        $this->checkIfAuthenticateUserIsStaffMemberOrThrowException();
        $response = new GetStaffRequestActionResponse();
        $staff = $this->getStaffIfExistOrThrowException($staffId);

        $staffWithUes = $this->loadStaffWithUes($staff);
        $ue = $this->getFirstUeForStaff($staffWithUes);

        $response->requests = $this->getRequestsForUe($ue);

        $response->message = 'Requests received by ' . $staff->user()->first()->name();
        return $response;
    }


    /**
     * @throws Exception
     */
    public static function checkIfAuthenticateUserIsStaffMemberOrThrowException(): void
    {
        $authUserRules = Auth::user()->rules()->pluck('name')->toArray();
        if (!in_array(RuleEnum::STAFF->value, $authUserRules)) {
            throw new Exception('This user is not a member of staff, so he cannot read a request');
        }
    }

    /**
     * @throws Exception
     */
    public static function getStaffIfExistOrThrowException(string $staffId): Staff
    {
        $staff = Staff::whereUserId($staffId)->whereIsDeleted(false)->first();

        if (is_null($staff)) {
            throw new Exception('Le membre du personnel spécifié n\'existe pas !');
        }
        return $staff;
    }

    public static function loadStaffWithUes(Staff $staff): Builder|array|Collection|Model
    {
        return Staff::with('ues')->find($staff->id);
    }

    protected function getFirstUeForStaff(Staff $staff): UE
    {
        if (!$staff->ues || $staff->ues->isEmpty()) {
            throw new Exception("Cet enseignant n'est associé à aucune UE.");
        }
        return $staff->ues->first();
    }

    protected function getRequestsForUe(UE $ue): Collection
    {
        return $ue->requests()
            ->whereStatut(RequestStateEnum::EN_COURS_DE_TRAITEMENT->value)
            ->with('attachments')
            ->with('sender')
            ->get();
    }

    /**
     * @throws Exception
     */
    public function handleDeleteRequest(string $requestId): DeleteRequestActionResponse
    {
        $response = new DeleteRequestActionResponse();
        $request = $this->checkIfRequestExistOrThrowException($requestId);
        $this->checkIfAuthUserIsOwnerRequestOrThrowException(Auth::user(), $request);
        $this->checkIfIsPossibleTodeleteRequest($request);
        $this->deleteRequestAndItsAttachments($request);

        $response->isDeleted = true;
        $response->message = 'Deleted Request and its attachments successful';
        return $response;
    }

    /**
     * @throws Exception
     */
    private function checkIfRequestExistOrThrowException(string $requestId): Request
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

    private function checkIfIsPossibleTodeleteRequest(Request $request): void
    {
        $requestStatutPossibleToDeleted = [RequestStateEnum::ACCEPTEE->value, RequestStateEnum::REFUSEE->value, RequestStateEnum::ATTENTE_DE_VALIDATION->value, RequestStateEnum::TERMINEE->value];
        if (!in_array($request->statut(), $requestStatutPossibleToDeleted)) {
            throw new Exception('Impossible de supprimer cette requete car en cours de traitement');
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

    private function removeAttachmentsFromDisk(Collection $attachments): void
    {
        //TODO : implement disk attachments suppression
    }

    /**
     * @throws Exception
     */
    public function handleSendRequest(SendRequestActionCommand $command): SendRequestActionResponse
    {
        $this->checkIfAuthenticateUserIsStudentOrThrowException();
        $response = new SendRequestActionResponse();
        $request = $this->checkIfRequestExistOrThrowException($command->requestId);
        $this->checkIfUeExistOrThrowException($command->ueId);
        $this->checkDeadlineForUE($command->ueId, $request);
        $request->ues()->attach($command->ueId);
        $this->updateRequestState($request, RequestStateEnum::ATTENTE_DE_VALIDATION);

        $response->isSent = true;
        $response->message = 'Send request successfully !';
        return $response;
    }

    /**
     * @throws Exception
     */
    public static function checkIfUeExistOrThrowException(string $ueId)
    {
        $ue = UE::whereId($ueId)->whereIsDeleted(false)->first();
        if (is_null($ue)) {
            throw new Exception('Cette UE n\'existe pas!');
        }
        return $ue;
    }

    /**
     * @throws Exception
     */
    public function checkDeadlineForUE(string $ueId, Request $request)
    {
        $ue = UE::findOrFail($ueId);
        $deadline = $ue->request_deadline;

        if ($deadline === null) {
            return null;
        }

        $now = Carbon::now();
        if ($now > $deadline) {
            $request->ues()->attach($ueId);
            $this->updateRequestState($request, RequestStateEnum::TERMINEE);
            $this->createRequestHistory($request, RequestStateEnum::TERMINEE->value);

            throw new Exception('La date limite de depot de requete pour cette UE est déjà passée.');

        }
        return $deadline;
    }

    public function updateRequestState(Request $request, RequestStateEnum $newRequestState): void
    {
        $request->fill(['statut' => $newRequestState->value])->save();

        $this->createRequestHistory($request, $newRequestState->value);
    }

    /**
     * @throws Exception
     */
    public function handleUpdateRequestStatus(string $requestId, string $newRequestStatut): UpdateRequestStatutActionResponse
    {
        $response = new UpdateRequestStatutActionResponse();
        $request = $this->checkIfRequestExistOrThrowException($requestId);
        $this->checkIfNewStateRequestExistInRequestEnumStatut($newRequestStatut);
        $request->update(['statut' => $newRequestStatut]);
        $this->createRequestHistory($request, $newRequestStatut);

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

    /**
     * @throws Exception
     */
    public function handleGetRequest(string $requestId): GetRequestActionResponse
    {
        $response = new GetRequestActionResponse();
        $request = $this->checkIfRequestExistOrThrowException($requestId);

        $response->request = Request::with('attachments')->find($requestId);
        $response->message = 'Request Successfully getted';

        return $response;

    }

    public function handleGetStaff(): GetStaffMemberActionResponse
    {
        $response = new GetStaffMemberActionResponse();

        $staffRoleId = Rule::where('name', RuleEnum::STAFF->value)->value('id');

        if (!$staffRoleId) {
            return $response;
        }
        $response->staff = User::whereHas('rules', function ($query) use ($staffRoleId) {
            $query->where('rule_id', $staffRoleId);
        })->get();

        return $response;
    }

    public function getStudentInfoByRequestId($requestId): GetStudentInformationActionResponse
    {
        $response = new GetStudentInformationActionResponse();
        $request = Request::with('sender.user')->find($requestId);

        if (!$request) {
            $response->message = 'Demande introuvable';
            return $response;
        }
        $studentInfo = [
            'matricule' => $request->sender->matricule,
            'nom' => $request->sender->user->name,
            'email' => $request->sender->user->email,
        ];
        $response->data = $studentInfo;
        $response->message = 'User Details';
        return $response;
    }

    public function getStudentDetails($studentId): GetStudentDetailsResponse
    {
        $response = new GetStudentDetailsResponse();
        try {
            $student = Student::with('department', 'level')->findOrFail($studentId);

            if ($student) {
                $response->data['department'] = $student->department;
                $response->data['level'] = $student->level;

//                $ues = UE::with('staff')
//                    ->where('level_id', $student->level->id)
//                    ->where('department_id', $student->department->id)
//                    ->get();  getting ue with all Model staff

                $ues = UE::with('staff.user:id,name') //  getting user
                ->where('level_id', $student->level->id)
                    ->where('department_id', $student->department->id)
                    ->get();


                $response->data['courses'] = $ues;
                $response->message = 'Student details retrieved successfully';
            } else {
                throw new Exception('Student not found');
            }
        } catch (Exception $e) {
            $response->message = 'Error: ' . $e->getMessage();
        }

        return $response;
    }

    /**
     * @throws Exception
     */
    public function handleGetRequestHistory(string $requestId): GetRequestHistoryActionResponse
    {
        $response = new GetRequestHistoryActionResponse();
        $request = $this->checkIfRequestExistOrThrowException($requestId);
        $history = RequestHistory::where('request_id', $requestId)->get();
        $response->message = "request road  getting successfully";
        $response->status = 200;
        $response->history = $history;

        return $response;

    }

    public function handleGetAllUser(): GetAllUserActionResponse
    {
        $response = new GetAllUserActionResponse();


        $users = User::
        whereIsDeleted(false)->with(['rules'])
            ->get()->first();

        $response->user = $users;

        return $response;
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

}

