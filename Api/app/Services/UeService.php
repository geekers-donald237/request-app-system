<?php

namespace App\Services;

use App\Commands\SaveDeadlineActionCommand;
use App\Models\Department;
use App\Responses\GetUeFromDepartmentWithDeadlineActionResponse;
use App\Responses\SaveDeadlineActionResponse;
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
}
