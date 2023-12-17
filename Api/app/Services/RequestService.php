<?php

namespace App\Services;

use App\Commands\SaveRequestActionCommand;
use App\Enums\RuleEnum;
use App\Enums\StorageDirectoryEnum;
use App\Helpers\HelpersFunction;
use App\Models\Attachment;
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

        $attachement = new Attachment();
        $fileName = HelpersFunction::handleFileUpload($command->fileHandWrite, StorageDirectoryEnum::FileHandWrite->value);
        $attachement->file_path = $fileName;
        $attachement->request_id = $request->id;
        $attachement->is_handwritten = true;
        $attachement->save();

        $this->processAttachments($command->fileAttachement, $request);
        $response->isSaved = true;
        $response->requestId = $request->id;
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
    private function processAttachments($attachments, Request $request): void
    {

        foreach ($attachments as $attachment) {
            $fileName = HelpersFunction::handleFileUpload(
                $attachment,
                StorageDirectoryEnum::FileAttachement->value
            );

            $attachmentModel = new Attachment();
            $attachmentModel->request_id = $request->id;
            $attachmentModel->file_path = $fileName;
            $attachmentModel->is_handwritten = false;

            $attachmentModel->save();
        }
    }
}
