<?php

namespace App\Enums;

enum StorageDirectoryEnum : string
{
    const ROOTDIRECTORY = 'public/request_app_system/';
    case FileHandWrite =  self::ROOTDIRECTORY . 'FileHandWrite';
    case FileAttachement =  self::ROOTDIRECTORY .'FileAttachement';
}
