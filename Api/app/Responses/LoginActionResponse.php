<?php

namespace App\Responses;

use App\Models\User;

class LoginActionResponse
{
    public string $token = '';
    public string $message = '';
    public User $user;
}
