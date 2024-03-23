<?php

namespace App\Services;

use App\Command\SaveDeadlineActionCommand;
use App\Command\UpdateDeadlineActionCommand;
use App\Enums\EmailEnum;
use App\Events\SendMailEvent;
use App\Models\Department;
use App\Models\Student;
use App\Models\UE;
use App\Models\User;
use App\Responses\GetUeFromDepartmentWithDeadlineActionResponse;
use App\Responses\GetUeFromStaffActionResponse;
use App\Responses\SaveDeadlineActionResponse;
use App\Responses\UpdateDeadlineActionResponse;
use Carbon\Carbon;
use Exception;
use Illuminate\Database\Eloquent\Collection;


class UeService
{
    /**
     * @throws Exception
     */
    public function handleSaveDeadline(SaveDeadlineActionCommand $command, string $secretaryId): SaveDeadlineActionResponse
    {
        $response = new SaveDeadlineActionResponse();
        RequestService::checkIfAuthenticateUserIsSecretaryOrThrowException();
        $secretary = RequestService::getSecretaryIfExistOrThrowException($secretaryId);
        $ues = $this->getSubjectsForSecretaryWithLevel($secretary, $command->levelId);
        $this->addPublicationDateForUEs(ues: $ues, command: $command);
        $this->sendEmailToStudents($command->levelId);

        $response->isSaved = true;
        $response->message = 'Deadline Successfully saved';
        return $response;
    }

    /**
     * @throws Exception
     */
    public function getSubjectsForSecretaryWithLevel($secretary, $levelId)
    {
        $department = $secretary->department;

        if ($department) {
            $subjects = $department->subjects;
            if ($subjects->isNotEmpty()) {
                return $subjects->filter(function ($subject) use ($levelId) {
                    return $subject->level_id == $levelId;
                });
            } else {
                throw new Exception('Ce département ne contient pas de matières.');
            }
        } else {
            throw new Exception('Secrétaire sans département associé.');
        }
    }


    public function addPublicationDateForUEs(Collection $ues, SaveDeadlineActionCommand $command): void
    {
        foreach ($ues as $ue) {
            $lastCharacter = substr($ue->code_ue, -1);
            $isEven = intval($lastCharacter) % 2 == 0;

            if ($isEven) {
                $ue->publication_date = $command->publicationDateS2;
            } else {
                $ue->publication_date = $command->publicationDateS1;
            }
            $requestDeadline = Carbon::parse($ue->publication_date)->addHours(intval($command->sendingRequestInterval));
            $ue->request_deadline = $requestDeadline;

            $ue->save();
        }
    }

    protected function sendEmailToStudents(int $levelId): void
    {
        $studentIds = Student::where('level_id', $levelId)->pluck('user_id');
        $users = User::whereIn('id', $studentIds)->get();
        $users->each(function ($user) {
            event(new SendMailEvent($user, EmailEnum::STATUT1->value));
        });
    }

    /**
     * @throws Exception
     */
    public function handleGetUeFromDepartmentAndDeadline(string $secretaryId): GetUeFromDepartmentWithDeadlineActionResponse
    {
        $response = new GetUeFromDepartmentWithDeadlineActionResponse();
        RequestService::checkIfAuthenticateUserIsSecretaryOrThrowException();
        $secretary = RequestService::getSecretaryIfExistOrThrowException($secretaryId);
        $department = $secretary->department;
        $subjects = $this->getSubjectsFromDepartment($department);

        $response->ues = $subjects;
        $response->message = "Ues récupérées avec succès";

        return $response;
    }

    /**
     * @throws Exception
     */
    private function getSubjectsFromDepartment(Department $department): Collection
    {
        $subjects = $department->subjects;

        if ($subjects->isEmpty()) {
            throw new Exception('Le département ne contient pas de matières.');
        }

        return $subjects;
    }

    /**
     * @throws Exception
     */
    public function handleUpdateDeadline(UpdateDeadlineActionCommand $command, string $ueId): UpdateDeadlineActionResponse
    {

        $response = new UpdateDeadlineActionResponse();
        RequestService::checkIfAuthenticateUserIsSecretaryOrThrowException();
        $ue = RequestService::checkIfUeExistOrThrowException($ueId);
        $this->updateUeInformation(ue: $ue, command: $command);
        $response->isSaved = true;
        $response->message = 'Deadline Successfully Updated';

        return $response;
    }

    public function updateUeInformation(UE $ue, UpdateDeadlineActionCommand $command): void
    {
        $ue->publication_date = $command->newPublicationDate;
        $ue->request_deadline = Carbon::parse($ue->publication_date)->addHours(intval($command->newSendingRequestInterval));
        $ue->save();
    }

    /**
     * @throws Exception
     */
    public function handleGetUeFromStaff(string $staffId): GetUeFromStaffActionResponse
    {
        $response = new GetUeFromStaffActionResponse();
        RequestService::checkIfAuthenticateUserIsStaffMemberOrThrowException();
        $staff = RequestService::getStaffIfExistOrThrowException($staffId);
        $staffWithUes = RequestService::loadStaffWithUes($staff);

        $response->message = "ues getting succesfully";
        $response->ues = $staffWithUes->ues;

        return $response;

    }

}
