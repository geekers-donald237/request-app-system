<?php

namespace App\Listeners;

use App\Events\SendMailEvent;
use App\Mail\SendMail;
use Illuminate\Support\Facades\Mail;

class SendMailListener
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(SendMailEvent $event): void
    {
        $userData = $event->userData;
        $status = $event->status;


        // Logique pour envoyer l'e-mail
        Mail::to($userData['email'])->send(new SendMail($userData, $status));
    }
}
