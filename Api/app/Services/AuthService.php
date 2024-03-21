<?php

namespace App\Services;


use App\Command\UpdateProfileActionCommand;
use App\Command\UpdateUserPasswordCommand;
use App\Commands\LoginActionCommand;
use App\Models\User;
use App\Responses\DeleteAccountActionResponse;
use App\Responses\GetUserProfileActionResponse;
use App\Responses\LoginActionResponse;
use App\Responses\LogoutActionResponse;
use App\Responses\UpdatePasswordActionResponse;
use App\Responses\UpdateProfilActionResponse;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;


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

    public function handleGetUserProfile(): GetUserProfileActionResponse
    {
        $response = new GetUserProfileActionResponse();


        $response->user = Auth::user()->where('is_deleted', false)
            ->with(['rules'])
            ->first();
        $response->message = "Profile From User";
        return $response;
    }

    public function handleUpdateProfile(UpdateProfileActionCommand $command): UpdateProfilActionResponse
    {
        $response = new UpdateProfilActionResponse();
        $user = Auth::user();
        $user->email = $command->email;
        $user->name = $command->name;
        $user->save();
        $response->message = "profile Update Succcesfully";
        return $response;
    }

    /**
     * @throws Exception
     */
    public function handleUpdatePassword(UpdateUserPasswordCommand $command): UpdatePasswordActionResponse
    {
        $response = new UpdatePasswordActionResponse();
        $user = Auth::user();
        if (Hash::check($command->password, $user->password)) {
            $response->message = "Le nouveau mot de passe doit être différent de l'ancien";
            return $response;
        }
        if (!($command->password === $command->cPassword)) {
            throw new Exception('La confirmation du mot de passe ne correspond pas');
        }
        $user->password = Hash::make($command->password);
        $user->save();
        $this->handleLogout();
        $response->message = "mot de passe mis à jour avec succès";
        return $response;
    }

    public function handleLogout(): LogoutActionResponse
    {
        $response = new LogoutActionResponse();
        Auth::user()->currentAccessToken()->delete();
        $response->message = 'User Logged Out Successfully';

        return $response;
    }

    public function handleDeleteAccount(Request $request): DeleteAccountActionResponse
    {
        $response = new DeleteAccountActionResponse;
        $user = $request->user();
        $user->is_deleted = true;
        $user->save();
        Auth::user()->currentAccessToken()->delete();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        $response->message = response()->noContent();
        return $response;
    }
}
