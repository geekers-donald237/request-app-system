<?php

namespace App\Command;

class NewsletterActionCommand
{
    public function __construct(
        public string $email,
    )
    {
    }
}
