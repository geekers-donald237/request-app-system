<?php

namespace App\Request;

use App\Shared\Infrastructure\HttpDataRequest;

class UpdateProfilActionRequest extends HttpDataRequest
{
    public function messages(): array
    {
        return [
            'name.required' => 'Veuillez renseigner votre name',
            'email.required' => 'Veuillez renseigner votre adresse email',
            'email.email' => 'Votre adresse email n\'est pas valide, veuillez entrer une adresse email de la forme (jonhdoe@exemple.com)',
        ];
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string',
            'email' => 'required|email|string',
        ];
    }

}
