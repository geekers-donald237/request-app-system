<?php

namespace App\Services;

use App\Commands\LoginActionCommand;
use App\Http\Requests\LoginActionRequest;
use App\Models\User;
use App\Responses\LoginActionResponse;
use App\Responses\LogoutActionResponse;
use Exception;
use Illuminate\Support\Facades\Auth;

class AuthService
{
    const API_TOKEN = "API TOKEN";

    /**
     * @throws Exception
     */
    public function handleLogin(LoginActionCommand $command): LoginActionResponse
    {
        $response = new LoginActionResponse();
        if (!Auth::attempt(['email' => $command->email, 'password' => $command->password])) {
            throw new Exception('Email & Password does not match with our record.');
        }
        $user = User::whereEmail($command->email)->first();

        if ($user) {
            $response->token = $user->createToken(self::API_TOKEN)->plainTextToken;
            $response->message = 'User Logged Successfully';
        } else {
            throw new Exception('User Not Found');
        }

        return $response;
    }

    public function handleLogout(): LogoutActionResponse
    {
        $response = new LogoutActionResponse();
        Auth::user()->currentAccessToken()->delete();
        $response->message = 'User Logged Out Successfully';

        return $response;
    }
}
