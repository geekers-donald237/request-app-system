<?php

namespace App\Factories;

use App\Command\SaveDeadlineActionCommand;
use App\Http\Request\SaveDeadlineRequest;

class SaveDeadlineActionCommandFactory
{
    public static function buildFromRequest(SaveDeadlineRequest $request): SaveDeadlineActionCommand
    {
        return new SaveDeadlineActionCommand(
            levelId: $request->get('levelId'),
            publicationDateS1: $request->get('publicationDateS1'),
            publicationDateS2: $request->get('publicationDateS2'),
            sendingRequestInterval: $request->get('sendingRequestInterval'),
        );
    }
}
