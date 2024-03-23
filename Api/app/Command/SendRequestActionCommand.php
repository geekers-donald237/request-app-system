<?php

namespace App\Command;

class SendRequestActionCommand
{
    public function __construct(
        public string $requestId,
        public string  $ueId
    )
    {
    }
}
