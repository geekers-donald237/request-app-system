<?php

namespace App\Http\Request;

use App\Shared\Infrastructure\HttpDataRequest;

class SendRequestActionRequest extends HttpDataRequest
{
    public function rules(): array
    {
        return [
            'requestId.required' => 'Veuillez renseigner la requête',
            'ueId.required' => 'Veuillez renseigner le(s) destinataire(s)',
        ];
    }

    public function messages(): array
    {
        return [
            'requestId' => 'required',
            'ueId' => 'required'
        ];
    }
}
