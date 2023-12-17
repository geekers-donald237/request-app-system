<?php

namespace App\Enums;

enum StorageDirectoryEnum : string
{
    const ROOTDIRECTORY = 'public/request_app_system/';
    case FileHandWritten =  self::ROOTDIRECTORY . 'FileHandWrite';
    case FileAttachement =  self::ROOTDIRECTORY .'FileAttachement';
}
