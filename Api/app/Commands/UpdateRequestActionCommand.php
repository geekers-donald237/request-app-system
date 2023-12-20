<?php

namespace App\Commands;

use Illuminate\Http\UploadedFile;

class UpdateRequestActionCommand
{
    public ?array $fileAttachments;

    public function __construct(
        public string       $requestId,
        public string       $content,
        public string       $title,
        public UploadedFile $fileHandWritten

    )
    {
        $this->fileAttachments = null;

    }
}
