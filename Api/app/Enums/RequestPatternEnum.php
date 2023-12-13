<?php

namespace App\Enums;

enum RequestPatternEnum: string
{
    case MARK_ERROR = 'erreur_de_note';
    case MARK_ERROR_DESCRIPTION = 'Correction d\'une erreur de note';

    case MARK_ABSENCE = 'absence_de_note';
    case MARK_ABSENCE_DESCRIPTION = 'Absence de note';

    case EXAMINATION_EXEMPTION = 'demande_dexemption_evaluation';
    case EXAMINATION_EXEMPTION_DESCRIPTION = 'Demande d\'exemption pour évaluation';

    case EXAMINATION_NOTE_REVISION = 'demande_revision_notes';
    case EXAMINATION_NOTE_REVISION_DESCRIPTION = 'Demande de révision des notes';

}
