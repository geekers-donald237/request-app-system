<?php

namespace App\Http\Requests;

use App\Shared\Infrastructure\HttpDataRequest;

class UpdateActionRequest extends HttpDataRequest
{
    public function messages(): array
    {
        return [
            'title.required' => 'Le champ intitulé est obligatoire.',
            'title.string' => 'Le champ title n\'pas valide.',
            'content.required' => 'Le champ contenu de la requête est obligatoire.',
            'fileHandWritten.required' => 'Veuillez fournir la pièce manuscrite.'
        ];
    }

    public function rules(): array
    {
        return [
            'title' => 'required|string',
            'content' => 'required|string',
            'fileHandWritten' => 'required|file'
        ];
    }
}
