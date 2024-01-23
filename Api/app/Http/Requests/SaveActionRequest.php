<?php

namespace App\Http\Requests;

use App\Shared\Infrastructure\HttpDataRequest;

class SaveActionRequest extends HttpDataRequest
{
    public function messages(): array
    {
        return [
            'title.required' => 'Le champ intitulé est obligatoire.',
            'title.string' => 'Le champ intitule n\'est pas valide.',
            'requestPatternId.required' => 'Le champ motif de la requête est obligatoire.',
            'content.required' => 'Le champ contenu de la requête est obligatoire.',
            'fileHandWritten.required' => 'Veuillez fournir la pièce manuscrite.'
        ];
    }

    public function rules(): array
    {
        return [
            'title' => 'required|string',
            'requestPatternId' => 'required',
            'content' => 'required|string',
            'fileHandWritten' => 'required|file'
        ];
    }

}
