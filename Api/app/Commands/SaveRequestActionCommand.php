<?php

namespace App\Commands;

class SaveRequestActionCommand
{
    public function __construct(
        public string $request_pattern_id,
        public string $content,
        public string $title){


    }
}
