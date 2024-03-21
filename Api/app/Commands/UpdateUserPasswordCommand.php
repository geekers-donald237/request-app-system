<?php

namespace App\Command;

class UpdateUserPasswordCommand
{
    public function __construct(
        public string $cPassword,
        public string $password
    )
    {
    }
}
