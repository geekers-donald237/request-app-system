<?php

namespace App\Http\Requests;

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
            'levelId' => 'required',  // Remplacez 'level_id' par le nom réel du champ du niveau
            'publicationDateS1' => 'required|date',  // Remplacez 'publication_date_s1' par le champ réel du S1
            'publicationDateS2' => 'required|date',  // Remplacez 'publication_date_s2' par le champ réel du S2
            'sendingRequestInterval' => 'required',  // Remplacez 'publication_date_s2' par le champ réel du S2
        ];
    }

}
