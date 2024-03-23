<?php

namespace App\Http\Request;

use App\Shared\Infrastructure\HttpDataRequest;

class UpdateDeadlineRequest extends HttpDataRequest
{
    public function messages(): array
    {
        return [
            'newPublicationDate.required' => 'Le champ date de publication du semestre 1 est obligatoire.',
            'newSendingRequestInterval.required' => 'Le champ intervale de soumission est obligatoire.',
        ];
    }

    public function rules(): array
    {
        return [
            'newPublicationDate' => 'required|date',
            'newSendingRequestInterval' => 'required',
        ];
    }

}
