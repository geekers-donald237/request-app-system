<?php

namespace App\Enums;

enum StorageDirectoryEnum: string
{
    const ROOT_DIRECTORY = 'students/attachments/';
    case FileHandWritten = self::ROOT_DIRECTORY . 'fileHandWritten';
    case FileAttachment = self::ROOT_DIRECTORY . 'fileAttachment';
}
