<?php

namespace App\Factories;

use App\Command\UpdateProfileActionCommand;
use App\Request\UpdateProfilActionRequest;

class UpdateProfileActionCommandFactory
{
    public static function buildFromRequest(UpdateProfilActionRequest $request): UpdateProfileActionCommand
    {
        return new UpdateProfileActionCommand(
            email: $request->get('email'),
            name: $request->get('name')
        );
    }
}
