<?php

namespace App\Http\Controllers;

use App\Events\SendMailEvent;
use Illuminate\Http\Request;

class MailWithEventController extends Controller
{
    public static function sendEmailWithEventToUser($name, $email, $status): void
    {
        $userData = [
            'name' => $name,
            'email' => $email,
        ];

        event(new SendMailEvent($userData, $status));
    }
}
