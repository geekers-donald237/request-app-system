<?php

namespace App\Factories;

use App\Command\SaveRequestActionCommand;
use App\Http\Request\SaveActionRequest;

class SaveRequestActionCommandFactory
{
    public static function buildFromRequest(SaveActionRequest $request): SaveRequestActionCommand
    {
        $command = new SaveRequestActionCommand(
            requestPatternId: $request->get('requestPatternId'),
            content: $request->get('content'),
            title: $request->get('title'),
            fileHandWritten: $request->file('fileHandWritten')
        );

        $command->fileAttachments = $request->file('fileAttachments');
        return $command;
    }
}
