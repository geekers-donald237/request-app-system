<?php

namespace App\Http\Request;

use App\Shared\Infrastructure\HttpDataRequest;


class UpdatePasswordActionRequest extends HttpDataRequest
{
    public function messages(): array
    {
        return [
            'password.required' => 'Veuillez renseigner votre mot de passe',
            'password.string' => 'Le mot de passe doit être une chaîne de caractères',
            'password.min' => 'Le mot de passe doit comporter au moins :min caractères',
            'cPassword.required' => 'Veuillez renseigner la confirmation du mot de passe',
            'cPassword.string' => 'La confirmation du mot de passe doit être une chaîne de caractères',
        ];
    }

    public function rules(): array
    {
        return [
            'password' => 'required|string|min:7',
            'cPassword' => 'required|string',
        ];
    }

}
