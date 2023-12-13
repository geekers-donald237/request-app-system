<?php

namespace App\Services;

use App\Commands\LoginActionCommand;
use App\Http\Requests\LoginRequest;
use App\Models\User;
use App\Responses\LoginActionResponse;
use Exception;
use Illuminate\Support\Facades\Auth;

class AuthService
{

    /**
     * @throws Exception
     */
    public function handle(LoginActionCommand $command): LoginActionResponse
    {
        $response = new LoginActionResponse();
        if (!Auth::attempt(['email' => $command->email, 'password' => $command->password])) {
            throw new Exception('Email & Password does not match with our record.');
        }
        $user = User::whereEmail($command->email)->first();

        if ($user) {
            $response->token = $user->createToken("API TOKEN")->plainTextToken;
            $response->message = 'User Logged Successfully';
        } else {
            throw new Exception('User Not Found');
        }

        return $response;
    }
}
