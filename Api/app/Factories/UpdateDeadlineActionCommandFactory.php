<?php

namespace App\Factories;

use App\Commands\UpdateDeadlineActionCommand;
use App\Http\Requests\UpdateDeadlineRequest;

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
