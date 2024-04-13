<?php

namespace App\Http\Request;

use App\Shared\Infrastructure\HttpDataRequest;

class RegisterActionRequest extends HttpDataRequest
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email|max:255',
            'matricule' => 'required|string|max:255',
            'password' => 'required|string|min:8',
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array
     */
    public function messages(): array
    {
        return [
            'name.required' => 'Le nom est requis.',
            'name.string' => 'Le nom doit être une chaîne de caractères.',
            'name.max' => 'Le nom ne peut pas dépasser :max caractères.',
            'email.required' => "L'email est requis.",
            'email.email' => "L'email doit être une adresse email valide.",
            'email.unique' => "Cet email est déjà utilisé.",
            'email.max' => "L'email ne peut pas dépasser :max caractères.",
            'matricule.required' => 'Le matricule est requis.',
            'matricule.string' => 'Le matricule doit être une chaîne de caractères.',
            'matricule.max' => 'Le matricule ne peut pas dépasser :max caractères.',
            'password.required' => 'Le mot de passe est requis.',
            'password.string' => 'Le mot de passe doit être une chaîne de caractères.',
            'password.min' => 'Le mot de passe doit avoir au moins :min caractères.',
        ];
    }
}
