<?php

namespace App\Commands;

class UpdateDeadlineActionCommand
{
    public function __construct(
        public string $newPublicationDate,
        public string $newSendingRequestInterval
    )
    {
    }
}
