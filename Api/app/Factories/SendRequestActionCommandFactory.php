<?php

namespace App\Factories;

use App\Commands\SendRequestActionCommand;
use App\Http\Requests\SendRequestActionRequest;

class SendRequestActionCommandFactory
{

    /**
     * @param SendRequestActionRequest $request
     * @return SendRequestActionCommand
     */
    public static function buildFromRequest(SendRequestActionRequest $request): SendRequestActionCommand
    {
        return new SendRequestActionCommand(
            requestId: $request->get('requestId'),
            ueId: $request->get('ueId')
        );
    }
}
