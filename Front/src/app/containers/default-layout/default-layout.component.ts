import {Component, OnInit} from '@angular/core';

import {Utils} from "../../features/services/shared/utils/utils";
import {UserRoleConstants} from "../../features/constant/constant";
import {INavData} from "@coreui/angular";
import {MessageService} from "primeng/api";
import {IUser} from "../../features/models/user.model";

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

    switch (role) {
      case UserRoleConstants.STUDENT:
        gestionDesRequetes.children = [
          {
            name: 'Echeance des Requêtes',
            url: '/app/student-dashboard',
            iconComponent: { name: 'cilSpeedometer' },
          },
          {
            name: 'Suivis des Requêtes',
            url: '/app/list-requests',
            iconComponent: { name: 'cilList' },
          },
          {
            name: 'Creation des Requêtes',
            url: '/app/add-individual-request',
            iconComponent: { name: 'cilPencil' },
          },
        ];
        break;
      case UserRoleConstants.STAFF:
        gestionDesRequetes.children = [
          {
            name: 'Echeance des Requêtes',
            url: '/app/staff/requests',
            iconComponent: { name: 'cilCalendar' },
          },
          {
            name: 'Traitement des Requêtes',
            url: '/app/receive-request',
            iconComponent: { name: 'cilTask' },
          },
        ];
        break;
      case UserRoleConstants.SECRETARY:
        gestionDesRequetes.children = [
          {
            name: 'Requêtes Reçus',
            url: '/app/secretary/requests',
            iconComponent: { name: 'cilInbox' },
          },
          {
            name: 'Echeance Requêtes',
            url: '/app/show-program',
            iconComponent: { name: 'cilCalendar' },
          },
          {
            name: 'Ajouter une échéance',
            url: '/app/add-program',
            iconComponent: { name: 'cilSettings' },
          },
        ];
        break;
      default:
        break;
    }


    userSection.push(gestionDesRequetes);

    return userSection;
  }

  protected readonly UserRoleConstants = UserRoleConstants;

}
