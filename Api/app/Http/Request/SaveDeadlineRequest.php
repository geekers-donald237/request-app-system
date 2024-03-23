<?php

namespace App\Http\Request;

use App\Shared\Infrastructure\HttpDataRequest;

class SaveDeadlineRequest extends HttpDataRequest
{
    public function messages(): array
    {
        return [
            'levelId.required' => 'Le champ niveau est obligatoire.',
            'publicationDateS1.required' => 'Le champ date de publication du semestre 1 est obligatoire.',
            'publicationDateS2.required' => 'Le champ date de publication du semestre 2 est obligatoire.',
            'sendingRequestInterval.required' => 'Le champ intervale de soumission est obligatoire.',
        ];
    }

    public function rules(): array
    {
        return [
            'levelId' => 'required',
            'publicationDateS1' => 'required|date',
            'publicationDateS2' => 'required|date',
            'sendingRequestInterval' => 'required',
        ];
    }

}
