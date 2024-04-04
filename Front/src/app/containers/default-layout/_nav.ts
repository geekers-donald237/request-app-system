import {INavData} from '@coreui/angular';

export const navItems: INavData[] = [

  {
    title: true,
    name: 'Étudiant',
  },
  {
    name: 'Gestion des requêtes',
    url: '/app/student-dashboard',
    // iconComponent: {name: 'cil-puzzle'},
    children: [
      // {
      //   name: 'Dashboard',
      //   url: '/app/student-dashboard',
      // },
      {
        name: 'Mes Requetes',
        url: '/app/list-requests',
      },
      {
        name: 'Requête Individuelle',
        url: '/app/add-individual-request',
      },
      {
        name: 'Requête de groupe',
        url: '/app/add-group-request',

      },
      {
        name: 'Echéances de requêtes',
        url: '/app/calendar',
      }
    ]
  },

  //enseignat staff
  {
    title: true,
    name: 'Staff',
  },
  {
    name: 'Gestion des requêtes',
    url: '/app',
    // iconComponent: {name: 'cil-puzzle'},
    children: [
      {
        name: ' Dashboard',
        url: '/app/requests',

      },
      {
        name: 'Traitement des requetes',
        url: '/app/receive-request',

      },
      {
        name: 'Echeance requetes',
        url: '/app/show-program',

      },
      {
        name: 'Ajouter une echeance',
        url: '/app/add-program',

      }
    ]
  },

  {
    name: 'Secrétaire',
    title: true,

  },
];
