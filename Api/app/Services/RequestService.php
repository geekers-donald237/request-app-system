<?php

namespace App\Services;

use App\Commands\SaveRequestActionCommand;
use App\Models\Request;
use App\Responses\saveRequestActionResponse;
use Illuminate\Support\Facades\Auth;

class RequestService
{
    /**
     * @throws \Exception
     */
    public function handle(SaveRequestActionCommand $command): saveRequestActionResponse
    {
        $response = new saveRequestActionResponse();
        $this->checkIfRequestPatternExistOrThrowException($command->requestPatternId);


        $request = new Request();
        $dataToSave = $this->buildRequestData($command);
        $request->fill($dataToSave)->save();

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
     * @throws \Exception
     */
    private function checkIfRequestPatternExistOrThrowException(int $requestPatternId): void
    {
        $existingRequestPattern = Request::whereRequestPatternId($requestPatternId)->whereIsDeleted(false)->first();

        if (!$existingRequestPattern) {
            throw new \Exception('Motif inexistant');
        }
    }
}
