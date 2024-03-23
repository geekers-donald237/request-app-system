<?php

namespace App\Factories;

use App\Command\NewsletterActionCommand;
use App\Http\Request\NewsletterActionRequest;

class NewsletterCommandFactory
{
    public static function buildFromRequest(NewsletterActionRequest $request): NewsletterActionCommand
    {
        return new NewsletterActionCommand(
            email: $request->get('email'),
        );
    }
}
