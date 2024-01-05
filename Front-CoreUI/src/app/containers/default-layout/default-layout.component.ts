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
  }

  ngOnInit(): void {
    this.generateNavItems();
  }

  private generateNavItems(): void {
    this.studentNavItems = this.generateUserSection('Étudiant', UserRoleConstants.STUDENT);
    this.staffNavItems = this.generateUserSection('Staff', UserRoleConstants.STAFF);
  }

  private generateUserSection(title: string, role: string): INavData[] {
    const userSection: INavData[] = [
      {
        title: true,
        name: title,
      },
    ];

    const gestionDesRequetes: INavData = {
      name: 'Gestion des requêtes',
      url: '/app',
      iconComponent: { name: 'cil-puzzle' },
      children: [],
    };

    if (role === UserRoleConstants.STUDENT) {
      gestionDesRequetes.children = [
        {
          name: 'Dashboard',
          url: '/app/student-dashboard',
        },
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
        },
      ];
    } else if (role === UserRoleConstants.STAFF) {
      gestionDesRequetes.children = [
        {
          name: 'Dashboard',
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
        },
      ];
    }

    userSection.push(gestionDesRequetes);

    return userSection;
  }

  protected readonly UserRoleConstants = UserRoleConstants;
}
