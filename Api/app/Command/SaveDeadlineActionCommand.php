<?php

namespace App\Command;

class SaveDeadlineActionCommand
{

    public function __construct(
        public string $levelId,
        public string $publicationDateS1,
        public string $publicationDateS2,
        public string $sendingRequestInterval

    )
    {
    }
}
