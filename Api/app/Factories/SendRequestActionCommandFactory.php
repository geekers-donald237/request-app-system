<?php

namespace App\Factories;

use App\Command\SendRequestActionCommand;
use App\Http\Request\SendRequestActionRequest;

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
