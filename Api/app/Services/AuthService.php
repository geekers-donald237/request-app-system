<?php

namespace App\Services;


use App\Command\LoginActionCommand;
use App\Command\RegisterActionCommand;
use App\Command\UpdateProfileActionCommand;
use App\Command\UpdateUserPasswordCommand;
use App\Enums\EmailEnum;
use App\Enums\RuleEnum;
use App\Events\SendMailEvent;
use App\Helpers\HelpersFunction;
use App\Models\Rule;
use App\Models\Student;
use App\Models\User;
use App\Responses\DeleteAccountActionResponse;
use App\Responses\GetUserProfileActionResponse;
use App\Responses\LoginActionResponse;
use App\Responses\LogoutActionResponse;
use App\Responses\RegisterActionResponse;
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

    /**
     * @throws Exception
     */
    public function handleRegister(RegisterActionCommand $command): RegisterActionResponse
    {
        if ($command->password !== $command->cPassword) {
            throw new \Exception("La confirmation du mot de passe ne correspond pas.");
        }
        $response = new RegisterActionResponse();
        $user = User::factory()->create([
            'name' => $command->name,
            'email' => $command->email,
            'password' => bcrypt($command->password)
        ]);

        $rule = Rule::whereName(RuleEnum::STUDENT)->firstOrFail();
        $user->rules()->attach($rule->id);

        // Créer un nouvel étudiant avec les informations spécifiques
        Student::factory()->create([
            'user_id' => $user->id,
            'matricule' => $command->matricule,
            'department_id' => '4',
            'level_id' => 3
        ]);


        $response->isRegistered = true;
        $response->message = 'Utilisateur enregistré avec succès';
        $this->userData = [
            'name' => $command->name,
            'email' => $command->email,
            'password' => $command->password,
        ];
        HelpersFunction::sendEmail($this->userData, EmailEnum::STATUT3->value);

        return $response;

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
        $userData = [
            'name' => $user->name,
            'email' => $user->email,
            'password' => $command->password,
        ];
        event(new SendMailEvent($userData, EmailEnum::STATUT5->value));
        $this->handleLogout();
        $response->isUpdated = true;
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
