<?php

namespace App\Enums;

enum RequestStateEnum: string
{
    case ATTENTE_DE_SOUMISSION = 'attente soumission'; //  l'état initial d'une demande avant que l'étudiant ne la soumette.

    case ATTENTE_DE_VALIDATION = 'attente validation'; // la demande a été soumise mais doit encore être validée par le système.

    case EN_COURS_DE_TRAITEMENT = 'en cours'; // la demande a été validée et est en attente de traitement par l'équipe responsable.

    case ACCEPTEE = 'accepter'; //  la demande a été approuvée.

    case REFUSEE = 'refuser'; // la demande a été refusée.

    case TERMINEE = 'terminer'; // la demande a été traitée et a abouti à une décision finale.



    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
