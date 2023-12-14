<?php

namespace App\Responses;

class saveRequestActionResponse
{
    public string $message = '';
    public ?int $requestId = null;
    public bool $isSaved = false;
}
