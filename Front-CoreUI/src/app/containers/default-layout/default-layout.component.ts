import { Component, OnInit } from '@angular/core';

import { Utils } from "../../features/services/shared/utils/utils";
import { IUser } from "../../features/models/login.response.model";
import { UserRoleConstants } from "../../features/constant/constant";
import { INavData } from "@coreui/angular";

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
})
export class DefaultLayoutComponent implements OnInit {

  public navItems: INavData[] = [];

  userRole: string | null = '';
  studentNavItems: INavData[] = [];
  staffNavItems: INavData[] = [];
  user: IUser | undefined;

  constructor(private utils: Utils) {
    const userDataString = localStorage.getItem('user');
    const userData = userDataString ? JSON.parse(userDataString) : null;
    this.userRole = this.utils.getUserRule(userData.rules);

    console.log('User Role:', this.userRole);
  }

  ngOnInit(): void {

    // Étudiant
    this.studentNavItems = [
      {
        title: true,
        name: 'Étudiant',
        roles: [UserRoleConstants.STUDENT]
      },
      {
        name: 'Gestion des requêtes',
        url: '/app',
        iconComponent: { name: 'cil-puzzle' },
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
    ];

    // Personnel
    this.staffNavItems = [
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
    ];
  }

  protected readonly UserRoleConstants = UserRoleConstants;
}
