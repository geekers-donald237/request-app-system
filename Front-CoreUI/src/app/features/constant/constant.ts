export class UserRoleConstants {
  static readonly STUDENT = 'student';
  static readonly SECRETARY = 'secretary';
  static readonly STAFF = 'staff';
  static readonly TECHNICAL_ADMIN = 'technical_admin';
}

export class RequestStateConstants {
  static readonly ATTENTE_DE_SOUMISSION = 'attente_soumission';
  static readonly ATTENTE_DE_VALIDATION = 'attente_validation';
  static readonly ATTENTE_DE_TRAITEMENT = 'attente_traitement';
  static readonly EN_COURS_DE_TRAITEMENT = 'en_cours';
  static readonly ATTENTE_DE_DECISION = 'attente_decision';
  static readonly ACCEPTEE = 'Accepter';
  static readonly REFUSEE = 'Refuser';
  static readonly TERMINEE = 'Terminer';
  static readonly EN_ATTENTE_DE_REPONSE_DE_L_ETUDIANT = 'reponse_etudiant';
}
