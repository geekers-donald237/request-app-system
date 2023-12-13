<?php

namespace App\Factories;

use App\Commands\LoginActionCommand;
use App\Http\Requests\LoginActionRequest;

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
