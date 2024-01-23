<?php

namespace App\Commands;

class SendRequestActionCommand
{
    public function __construct(
        public string $requestId,
        public string  $ueId
    )
    {
    }
}
