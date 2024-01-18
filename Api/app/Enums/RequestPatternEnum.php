<?php

namespace App\Enums;

enum RequestPatternEnum: string
{
    case MARK_ERROR = 'erreur de note';
    case MARK_ABSENCE = 'absence de note';
    case EXAMINATION_EXEMPTION = 'demande d\'exemption evaluation';
    case EXAMINATION_NOTE_REVISION = 'demande revision notes';


    ## DESCRIPTION
    case MARK_ERROR_DESCRIPTION = 'Erreur de note';

    case MARK_ABSENCE_DESCRIPTION = 'Absence de note';

    case EXAMINATION_EXEMPTION_DESCRIPTION = 'Demande d\'exemption pour évaluation';

    case EXAMINATION_NOTE_REVISION_DESCRIPTION = 'Demande de révision des notes';

}
