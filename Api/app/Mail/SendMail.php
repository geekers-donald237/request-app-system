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
        $view = match ($this->status) {
            EmailEnum::STATUT1->value => 'email.deadline',
            EmailEnum::STATUT2->value => 'email.etat',
            EmailEnum::STATUT3->value => 'email.password',
            EmailEnum::STATUT4->value => 'email.newsletter',
            EmailEnum::STATUT5->value => 'email.update_password',
            default => 'email.default',
        };


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
