<?php

namespace App\Factories;

use App\Command\UpdateProfileActionCommand;
use App\Http\Request\UpdateProfileActionRequest;

class UpdateProfileActionCommandFactory
{
    public static function buildFromRequest(UpdateProfileActionRequest $request): UpdateProfileActionCommand
    {
        return new UpdateProfileActionCommand(
            email: $request->get('email'),
            name: $request->get('name')
        );
    }
}
