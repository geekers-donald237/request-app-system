import {Component, OnInit} from '@angular/core';

import {Utils} from "../../features/services/shared/utils/utils";
import {IUser} from "../../features/models/login.response.model";
import {UserRoleConstants} from "../../features/constant/constant";
import {INavData} from "@coreui/angular";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
  providers: [MessageService]
})
export class DefaultLayoutComponent implements OnInit {

  public navItems: INavData[] = [];

  userRole: string | null = '';
  studentNavItems: INavData[] = [];
  staffNavItems: INavData[] = [];
  secretaryNavItems: INavData[] = [];
  user: IUser | undefined;

  constructor(private utils: Utils
    , private messageService: MessageService
  ) {
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
    this.secretaryNavItems = this.generateUserSection('Secretary', UserRoleConstants.SECRETARY);
  }

  private generateUserSection(title: string, role: string): INavData[] {
    const userSection: INavData[] = [
      {
        title: true,
        name: title,
      },
    ];

    const gestionDesRequetes: INavData = {
      name: 'Gestion des Requêtes',
      url: '/app',
      iconComponent: {name: 'cil-puzzle'},
      children: [],
    };

    if (role === UserRoleConstants.STUDENT) {
      gestionDesRequetes.children = [
        {
          name: 'Dashboard',
          url: '/app/student-dashboard',
        },
        {
          name: 'Suivis des Requêtes',
          url: '/app/list-requests',
        },
        {
          name: 'Creation des Requêtes',
          url: '/app/add-individual-request',
        },


      ];
    } else if (role === UserRoleConstants.STAFF) {
      gestionDesRequetes.children = [
        {
          name: 'Dashboard',
          url: '/app/staff/requests',
        },
        {
          name: 'Traitement des Requêtes',
          url: '/app/receive-request',
        },
        {
          name: 'Echeance Requêtes',
          url: '/app/show-program',
        },
        {
          name: 'Ajouter une echeance',
          url: '/app/add-program',
        },
      ];
    } else if (role === UserRoleConstants.SECRETARY) {
      gestionDesRequetes.children = [
        {
          name: 'Requêtes Reçus',
          url: '/app/secretary/requests',
        },
        // {
        //   name: 'details requete',
        //   url: '/app/receive-request',
        // },
      ];
    }

    userSection.push(gestionDesRequetes);

    return userSection;
  }

  protected readonly UserRoleConstants = UserRoleConstants;

}
