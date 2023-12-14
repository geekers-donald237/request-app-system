<?php

namespace App\Services;

use App\Commands\SaveRequestActionCommand;
use App\Enums\RuleEnum;
use App\Models\Request;
use App\Models\RequestPattern;
use App\Responses\saveRequestActionResponse;
use Exception;
use Illuminate\Support\Facades\Auth;

class RequestService
{
    /**
     * @throws Exception
     */
    public function handle(SaveRequestActionCommand $command): saveRequestActionResponse
    {
        $response = new saveRequestActionResponse();
        $this->checkIfAuthenticateUserIsStudentOrThrowException();
        $this->checkIfRequestPatternExistOrThrowException($command->requestPatternId);


        $request = new Request();
        $dataToSave = $this->buildRequestData($command);
        $request->fill($dataToSave)->save();

        $response->isSaved = true;
        $response->requestId = $request->id;
        $response->message = 'Request Successfully saved';


        return $response;
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
     * @throws Exception
     */
    private function checkIfAuthenticateUserIsStudentOrThrowException(): void
    {
        $authUserRules = Auth::user()->rules()->pluck('name')->toArray();
        if (!in_array(RuleEnum::STUDENT->value, $authUserRules)) {
            throw new Exception('This user is not a student, so he cannot create a request');
        }
    }
}
