<?php

namespace App\Commands;

class SaveDeadlineActionCommand
{

    public function __construct(
        public string $levelId,
        public string $publication_date_s1,
        public string $publication_date_s2,

    )
    {
    }
}
