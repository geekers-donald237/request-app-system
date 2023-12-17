<?php

namespace App\Factories;

use App\Commands\SaveRequestActionCommand;
use App\Http\Requests\SaveActionRequest;

class SaveRequestActionCommandFactory
{

    public static function buildFromRequest(SaveActionRequest $request): SaveRequestActionCommand
    {
        return new SaveRequestActionCommand(
            requestPatternId: $request->get('requestPatternId'),
            content: $request->get('content'),
            title: $request->get('title'),
            fileHandWrite: $request->file('fileHandWrite'), // Utiliser la méthode file() pour les fichiers
            fileAttachement: $request->file('fileAttachement'), // Utiliser la méthode file() pour les fichiers

        );
    }
}
