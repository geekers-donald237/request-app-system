<?php

namespace App\Factories;

use App\Commands\UpdateRequestActionCommand;
use App\Http\Requests\UpdateActionRequest;

class UpdateRequestActionCommandFactory
{
    public static function buildFromRequest(UpdateActionRequest $request): UpdateRequestActionCommand
    {
        $command = new UpdateRequestActionCommand(
            requestId: $request->route('requestId'),
            content: $request->get('content'),
            title: $request->get('title'),
            fileHandWritten: $request->file('fileHandWritten')
        );

        $command->fileAttachments = $request->file('attachments');
        return $command;
    }
}
