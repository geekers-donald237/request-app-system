<?php

namespace App\Enums;

enum RequestPatternEnum: string
{
    case MARK_ERROR = 'erreur de note';
    case MARK_ABSENCE = 'absence de note';
    case MARK_ABSENCE_DESCRIPTION = 'lorem ipsum dolor sit amer consectur';
    case MARK_ERROR_DESCRIPTION = 'lorem ipsum dolor sit amer consectur rt fd';
}
