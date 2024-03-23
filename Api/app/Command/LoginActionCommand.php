<?php

namespace App\Command;

class LoginActionCommand
{
    public function __construct(
        public string $email,
        public string $password
    )
    {
    }
}
