<?php

namespace App\Services;

use App\Commands\LoginActionCommand;
use App\Commands\NewsletterActionCommand;
use App\Enums\EmailEnum;
use App\Events\SendMailEvent;
use App\Models\Newsletter;
use App\Models\User;
use App\Responses\LoginActionResponse;
use App\Responses\LogoutActionResponse;
use App\Responses\NewsletterActionResponse;
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
            throw new Exception('Email & Password do not match with our records.');
        }

        // Utilisez le modèle User pour récupérer l'utilisateur avec les relations appropriées
        $user = User::where('email', $command->email)
            ->where('is_deleted', false)
            ->with(['rules'])
            ->first();

        if ($user) {
            $response->isLogged = true;
            $response->user = $user;
            $response->token = $user->createToken(self::API_TOKEN)->plainTextToken;
            $response->message = 'User Logged Successfully';
            return $response;
        }

        throw new Exception('User Not Found');
    }

    public function handleNewsletter(NewsletterActionCommand $command): NewsletterActionResponse
    {
        $response = new NewsletterActionResponse();
        $newsletter = $this->createNewsletter($command->email);
        $userData = [
            'name' => '',
            'email' => $command->email,
        ];
        event(new SendMailEvent($userData, EmailEnum::STATUT4->value));
        $response->message = 'User newsletter Successfully';
        return $response;
    }

    private function createNewsletter(string $email): Newsletter
    {
        $newsletter = new Newsletter();
        $newsletter->email = $email;
        $newsletter->save();
        return $newsletter;
    }


    public function handleLogout(): LogoutActionResponse
    {
        $response = new LogoutActionResponse();
        Auth::user()->currentAccessToken()->delete();
        $response->message = 'User Logged Out Successfully';

        return $response;
    }
}
