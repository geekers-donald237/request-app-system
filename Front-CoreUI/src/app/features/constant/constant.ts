export class UserRoleConstants {
  static readonly STUDENT = 'request';
  static readonly SECRETARY = 'secretary';
  static readonly STAFF = 'staff';
  static readonly TECHNICAL_ADMIN = 'technical_admin';
}

export class RequestStateConstants {
  static readonly ATTENTE_DE_SOUMISSION = 'en_attente_de_soumission';
  static readonly ATTENTE_DE_VALIDATION = 'en_attente_de_validation';
  static readonly ATTENTE_DE_TRAITEMENT = 'en_attente_de_traitement';
  static readonly EN_COURS_DE_TRAITEMENT = 'en_cours_de_traitement';
  static readonly ATTENTE_DE_DECISION = 'en_attente_de_decision';
  static readonly ACCEPTEE = 'acceptee';
  static readonly REFUSEE = 'refusee';
  static readonly TERMINEE = 'terminee';
  static readonly EN_ATTENTE_DE_REPONSE_DE_L_ETUDIANT = 'en_attente_de_reponse_etudiant';
}
