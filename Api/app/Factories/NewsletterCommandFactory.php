<?php

namespace App\Factories;

use App\Commands\NewsletterActionCommand;
use App\Http\Requests\NewsletterActionRequest;

class NewsletterCommandFactory
{
    public static function buildFromRequest(NewsletterActionRequest $request): NewsletterActionCommand
    {
        return new NewsletterActionCommand(
            email: $request->get('email'),
        );
    }
}
