export class UserRoleConstants {
  static readonly STUDENT = 'student';
  static readonly SECRETARY = 'secretary';
  static readonly STAFF = 'staff';
  static readonly TECHNICAL_ADMIN = 'technical_admin';
}

export class RequestStateConstants {
  static readonly ATTENTE_DE_SOUMISSION = 'attente soumission';
  static readonly ATTENTE_DE_VALIDATION = 'attente validation';
  static readonly EN_COURS_DE_TRAITEMENT = 'en cours';
  static readonly ACCEPTEE = 'accepter';
  static readonly REFUSEE = 'refuser';
  static readonly TERMINEE = 'terminer';
  static readonly NON_DEFINI = 'non defini';
}

export const requestModel = 'Monsieur (ou Madame),\n' +
  '\n' +
  'J\'ai l\'honneur de venir très respectueusement auprès de votre haute bienveillance solliciter votre soutien dans le cadre de ma démarche académique.\n' +
  '\n' +
  'En effet, je suis étudiant(e) en [nom de votre filière ou programme d\'études] et je me permets de solliciter votre bienveillance pour [expliquer brièvement la nature de votre demande, que ce soit une demande d\'information, d\'assistance, ou autre].\n' +
  '\n' +
  'Dans l\'attente d\'une suite favorable, veuillez agréer, Monsieur (ou Madame), mes expressions les plus chaleureuses !'
