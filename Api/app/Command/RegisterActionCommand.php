<?php

namespace App\Command;

class RegisterActionCommand
{
    public function __construct(public string $name,
                                public string $matricule,
                                public string $password,
                                public string $email,
                                public string $cPassword)
    {
    }
}
