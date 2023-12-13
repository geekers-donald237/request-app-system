<?php

namespace App\Factories;

use App\Commands\SaveRequestActionCommand;
use App\Http\Requests\SaveActionRequest;

class SaveRequestActionCommandFactory
{

    public static function buildFromRequest(SaveActionRequest $request): SaveRequestActionCommand
    {
        return new SaveRequestActionCommand(
            request_pattern_id : $request->get('request_pattern_id'),
            content: $request->get('content'),
            title: $request->get('title'),
        );

    }
}
