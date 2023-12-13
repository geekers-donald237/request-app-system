<?php

namespace App\Http\Requests;

use App\Shared\Infrastructure\HttpDataRequest;

class SaveActionRequest extends HttpDataRequest
{
    public function messages(): array
    {
        return [
            'title.required' => 'Le champ intitulé est obligatoire.',
            'request_pattern_id.required' => 'Le champ motif de la requête est obligatoire.',
            'content.required' => 'Le champ contenu de la requête est obligatoire.',
//            'piece_manuscrite.required' => 'Veuillez fournir la pièce manuscrite.',
//            'piece_jointe.*.required' => 'Toutes les pièces jointes sont obligatoires.',
//            'piece_jointe.*.mimes' => 'Les pièces jointes doivent être au format :jpeg,png,pdf',
//            'ue.required' => 'Veuillez choisir l\'UE correspondante.'
        ];
    }

    public function rules(): array
    {
        return [
            'title' => 'required',
            'request_pattern_id' => 'required',
            'content' => 'required',
//            'piece_manuscrite' => 'required|file|mimes:jpeg,png,pdf',
//            'piece_jointe.*' => 'required|file|mimes:jpeg,png,pdf',
//            'ue' => 'required'
        ];
    }

}
