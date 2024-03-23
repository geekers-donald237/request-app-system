<?php

namespace App\Command;

class UpdateProfileActionCommand
{
    public function __construct(public string $email, public string $name)
    {
    }
}
