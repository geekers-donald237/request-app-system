<?php

namespace App\Commands;

use Illuminate\Http\UploadedFile;

class SaveRequestActionCommand
{
    public function __construct(
        public string             $requestPatternId,
        public string             $content,
        public string             $title,
        public UploadedFile       $fileHandWrite,
        public array|UploadedFile $fileAttachement
    )
    {


    }
}
