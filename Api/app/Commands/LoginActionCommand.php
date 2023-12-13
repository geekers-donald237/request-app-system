<?php

namespace App\Commands;

class LoginActionCommand
{
    public function __construct(
        public string $email,
        public string $password
    )
    {
    }
}
