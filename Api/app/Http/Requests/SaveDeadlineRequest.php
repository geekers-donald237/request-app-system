<?php

namespace App\Http\Requests;

use App\Shared\Infrastructure\HttpDataRequest;

class SaveDeadlineRequest extends HttpDataRequest
{
    public function messages(): array
    {
        return [
            'levelId.required' => 'Le champ niveau est obligatoire.',
            'publication_date_s1.required' => 'Le champ date de publication du semestre 1 est obligatoire.',
            'publication_date_s2.required' => 'Le champ date de publication du semestre 2 est obligatoire.',
        ];
    }

    public function rules(): array
    {
        return [
            'levelId' => 'required',  // Remplacez 'level_id' par le nom réel du champ du niveau
            'publication_date_s1' => 'required|date',  // Remplacez 'publication_date_s1' par le champ réel du S1
            'publication_date_s2' => 'required|date',  // Remplacez 'publication_date_s2' par le champ réel du S2
        ];
    }

}
