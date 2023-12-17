<?php

namespace App\Commands;

use Illuminate\Http\UploadedFile;

class SaveRequestActionCommand
{
    public ?array $fileAttachments;

    public function __construct(
        public string       $requestPatternId,
        public string       $content,
        public string       $title,
        public UploadedFile $fileHandWritten

    )
    {
        $this->fileAttachments = null;

    }
}
