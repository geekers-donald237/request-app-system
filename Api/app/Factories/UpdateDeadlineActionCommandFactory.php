<?php

namespace App\Factories;

use App\Command\UpdateDeadlineActionCommand;
use App\Http\Request\UpdateDeadlineRequest;

class UpdateDeadlineActionCommandFactory
{
    public static function buildFromRequest(UpdateDeadlineRequest $request): UpdateDeadlineActionCommand
    {
        return new UpdateDeadlineActionCommand(
            newPublicationDate: $request->get('newPublicationDate'),
            newSendingRequestInterval: $request->get('newSendingRequestInterval'),
        );
    }
}
