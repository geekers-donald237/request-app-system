<?php

namespace App\Commands;

class NewsletterActionCommand
{
    public function __construct(
        public string $email,
    )
    {
    }
}
