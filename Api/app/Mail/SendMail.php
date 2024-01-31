<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class SendMail extends Mailable
{
    use Queueable, SerializesModels;

    public $userData;
    public $status;

    public function __construct($userData, $status)
    {
        $this->userData = $userData;
        $this->status = $status;
    }

    public function build()
    {
        // Choisissez la vue en fonction du statut
        $view = ''; // Vue par défaut

        if ($this->status == 'status1') {
            $view = 'email.deadline';
        } elseif ($this->status == 'status2') {
            $view = 'email.etat';
        } elseif ($this->status == 'status3') {
            $view = 'email.password';
        }

        return $this->view($view)
            ->with(['userData' => $this->userData]);
    }
}
