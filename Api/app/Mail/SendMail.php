<?php

namespace App\Mail;

use App\Enums\EmailEnum;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
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

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Mail From Easy Request',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        $view = 'email.password'; // Par défaut, utilisez la vue 'email.password'

        // Vérifiez la valeur de $this->status et mettez à jour $view en conséquence
        if ($this->status == EmailEnum::STATUT1->value) {
            $view = 'email.deadline';
        } elseif ($this->status == EmailEnum::STATUT2->value) {
            $view = 'email.etat';
        } elseif ($this->status == EmailEnum::STATUT3->value) {
            $view = 'email.password';
        }

        return new Content(view: $view);
    }



    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
