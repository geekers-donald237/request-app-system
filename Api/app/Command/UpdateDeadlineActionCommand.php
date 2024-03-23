<?php

namespace App\Command;

class UpdateDeadlineActionCommand
{
    public function __construct(
        public string $newPublicationDate,
        public string $newSendingRequestInterval
    )
    {
    }
}
