<?php

namespace App\Factories;

use App\Commands\SaveRequestActionCommand;
use App\Http\Requests\SaveActionRequest;

class SaveRequestActionCommandFactory
{

    public static function buildFromRequest(SaveActionRequest $request): SaveRequestActionCommand
    {
        $command = new SaveRequestActionCommand(
            requestPatternId: $request->get('requestPatternId'),
            content: $request->get('content'),
            title: $request->get('title'),
            fileHandWrite: $request->file('fileHandWrite'),
            receiverIds: $request->get('receiverIds')
        );

        $command->fileAttachments = $request->file('fileAttachments');
        return $command;
    }
}
