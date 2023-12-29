<?php

namespace App\Enums;

enum RequestStateEnum: string
{
    case ATTENTE_DE_SOUMISSION = 'en_attente_de_soumission'; //  l'état initial d'une demande avant que l'étudiant ne la soumette.

    case ATTENTE_DE_VALIDATION = 'en_attente_de_validation'; // la demande a été soumise mais doit encore être validée par le système.

    case ATTENTE_DE_TRAITEMENT = 'en_attente_de_traitement'; // la demande a été validée et est en attente de traitement par l'équipe responsable.

    case EN_COURS_DE_TRAITEMENT = 'en_cours_de_traitement'; // la demande a été validée et est en attente de traitement par l'équipe responsable.

    case ATTENTE_DE_DECISION = 'en_attente_de_decision'; // la demande a été traitée et est en attente d'une décision finale.

    case ACCEPTEE = 'acceptee'; //  la demande a été approuvée.

    case REFUSEE = 'refusee'; // la demande a été refusée.

    case TERMINEE = 'terminee'; // la demande a été traitée et a abouti à une décision finale.

    case EN_ATTENTE_DE_REPONSE_DE_L_ETUDIANT = 'en_attente_de_reponse_etudiant'; // la demande a été approuvée sous réserve de l'acceptation de l'étudiant, qui doit encore fournir une réponse.


    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
