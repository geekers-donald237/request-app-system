import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListRequestComponent} from "./student/list-request/list-request.component";
import {AddIndividualRequestComponent} from "./student/add-individual-request/add-individual-request.component";
import {ReceivesRequestComponent} from "./staff/receives-request/receives-request.component";
import {AddDeadlineComponent} from "./staff/add-deadline/add-deadline.component";
import {ViewDeadlinesComponent} from "./staff/view-deadlines/view-deadlines.component";
import {ShowRequestComponent} from "./staff/show-request/show-request.component";
import {StaffDashboardComponent} from "./staff/staff-dashboard/staff-dashboard.component";
import {StudentDashboardComponent} from "./student/student-dashboard/student-dashboard.component";
import {ShowRequestSecretaryComponent} from "./secretary/show-request-secretary/show-request-secretary.component";
import {
  ReceiveRequestSecretaryComponent
} from "./secretary/receive-request-secretary/receive-request-secretary.component";


const routes: Routes = [
  {
    path: 'student-dashboard',
    component: StudentDashboardComponent,
    data: {
      title: 'Ma liste des requêtes'
    }
  }, {
    path: 'list-requests',
    component: ListRequestComponent,
    data: {
      title: 'Ma liste des requêtes'
    }
  },
  {
    path: 'add-individual-request',
    component: AddIndividualRequestComponent,
    data: {
      title: 'Nouvelle requête'
    }
  },

  // staff
  {
    path: 'requests',
    component: StaffDashboardComponent,
    data: {
      title: 'Statitiques Staff'
    }
  }
  , {
    path: 'receive-request',
    component: ReceivesRequestComponent,
    data: {
      title: 'Requetes Staff'
    }
  },
  {
    path: 'show-program',
    component: ViewDeadlinesComponent,
    data: {
      title: 'program '
    }
  },
  {
    path: 'add-program',
    component: AddDeadlineComponent,
    data: {
      title: 'ajouter deadline'
    }
  },

  {
    path: 'show-request',
    component: ShowRequestComponent,
    data: {
      title: 'voir requete'
    }
  },


  // secretary
  {
    path: 'secretary/requests',
    component: ReceiveRequestSecretaryComponent,
    data: {
      title: 'requete secetaire'
    }
  }, {
    path: 'secretary/requests/details',
    component: ShowRequestSecretaryComponent,
    data: {
      title: 'requete secetaire details'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScreensRoutingModule {
}
