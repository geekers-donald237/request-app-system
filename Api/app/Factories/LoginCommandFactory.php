<?php

namespace App\Factories;

use App\Command\LoginActionCommand;
use App\Http\Request\LoginActionRequest;

class LoginCommandFactory
{

    public static function buildFromRequest(LoginActionRequest $request): LoginActionCommand
    {
        return new LoginActionCommand(
            email: $request->get('email'),
            password: $request->get('password')
        );
    }
}
