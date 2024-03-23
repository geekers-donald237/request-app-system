<?php

namespace App\Enums;

enum EmailEnum : string
{
    case STATUT1 = 'update-deadline';
    case STATUT2 = 'sending_credentials';
    case STATUT3 = 'update_request_state';
    case STATUT4 = 'subscribe_to_newsletter';
    case STATUT5 = 'update_password';
}
