<?php

namespace App\Http\Request;

use App\Shared\Infrastructure\HttpDataRequest;

class NewsletterActionRequest extends HttpDataRequest
{
    public function messages(): array
    {
        return [
            'email.required' => 'Veuillez renseigner votre adresse email',
            'email.email' => 'Votre adresse email n\'est pas valide, veuillez entrer une adresse email de la forme (jonhdoe@exemple.com)',
        ];
    }
    public function rules(): array
    {
        return [
            'email' => ['required', 'email'],
        ];
    }

}
