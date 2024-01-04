import {INavData} from '@coreui/angular';
import {UserRoleConstants} from "../../features/constant/constant";

export const navItems: INavData[] = [

  {
    title: true,
    name: 'Étudiant',
    roles: [UserRoleConstants.STUDENT]
  },
  {
    name: 'Gestion des requêtes',
    url: '/app',
    iconComponent: {name: 'cil-puzzle'},
    children: [
      {
        name: 'Dashboard',
        url: '/app/list-requests',
        roles: [UserRoleConstants.STUDENT]
      },
      {
        name: 'Requête Individuelle',
        url: '/app/add-individual-request',
        roles: [UserRoleConstants.STUDENT]
      },
      {
        name: 'Requête de groupe',
        url: '/app/add-group-request',
        roles: [UserRoleConstants.STUDENT]
      },
      {
        name: 'Echéances de requêtes',
        url: '/app/calendar',
        roles: [UserRoleConstants.STUDENT]
      }
    ]
  },

  //enseignat staff
  {
    title: true,
    name: 'Staff',
    roles: [UserRoleConstants.STAFF]
  },
  {
    name: 'Gestion des requêtes',
    url: '/app',
    iconComponent: {name: 'cil-puzzle'},
    children: [
      {
        name: ' Dashboard',
        url: '/app/requests',
        roles: [UserRoleConstants.STAFF]

      },
      {
        name: 'Traitement des requetes',
        url: '/app/receive-request',
        roles: [UserRoleConstants.STAFF]

      },
      {
        name: 'Echeance requetes',
        url: '/app/show-program',
        roles: [UserRoleConstants.STAFF]

      },
      {
        name: 'Ajouter une echeance',
        url: '/app/add-program',
        roles: [UserRoleConstants.STAFF]

      }
    ]
  },

  {
    name: 'Secrétaire',
    title: true,
    roles: [UserRoleConstants.SECRETARY]

  },
];
