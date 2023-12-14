<?php

namespace App\Commands;

class SaveRequestActionCommand
{
    public function __construct(
        public string $requestPatternId,
        public string $content,
        public string $title)
    {


    }
}
