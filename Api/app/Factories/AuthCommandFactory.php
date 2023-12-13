<?php

namespace App\Factories;

use App\Commands\LoginActionCommand;
use App\Http\Requests\LoginRequest;

class AuthCommandFactory
{

    public static function buildFromRequest(LoginRequest $request): LoginActionCommand
    {
        return new LoginActionCommand(
            email: $request->get('email'),
            password: $request->get('password')
        );
    }
}
