<?php

namespace App\Factories;

use App\Command\UpdateUserPasswordCommand;
use App\Request\UpdatePasswordActionRequest;

class UpdateUserPasswordCommandFactory
{
    public static function buildFromRequest(UpdatePasswordActionRequest $request): UpdateUserPasswordCommand
    {
        return new UpdateUserPasswordCommand(
            cPassword: $request->get('cPassword'),
            password: $request->get('password')
        );
    }
}
