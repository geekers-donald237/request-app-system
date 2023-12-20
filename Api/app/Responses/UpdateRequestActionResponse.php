<?php

namespace App\Responses;

use App\Models\Request;

class UpdateRequestActionResponse
{
    public string $message = '';
    public Request|null $request = null;
}
