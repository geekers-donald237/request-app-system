<?php

namespace App\Factories;

use App\Command\RegisterActionCommand;
use App\Http\Request\RegisterActionRequest;

class RegisterCommandFactory
{
    public static function buildFromRequest(RegisterActionRequest $request): RegisterActionCommand
    {
        return new RegisterActionCommand(
            name: $request->get('name'),
            matricule: $request->get('matricule'),
            password: $request->get('password'),
            email: $request->get('email'),
            cPassword: $request->get('password_confirmation')
        );
    }
}
