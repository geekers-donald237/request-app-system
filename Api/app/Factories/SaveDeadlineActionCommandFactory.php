<?php

namespace App\Factories;

use App\Commands\SaveDeadlineActionCommand;
use App\Http\Requests\SaveDeadlineRequest;

class SaveDeadlineActionCommandFactory
{
    public static function buildFromRequest(SaveDeadlineRequest $request): SaveDeadlineActionCommand
    {
        return new SaveDeadlineActionCommand(
            levelId: $request->get('levelId'),
            publication_date_s1: $request->get('publication_date_s1'),
            publication_date_s2: $request->get('publication_date_s2'),
        );
    }
}
