import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListRequestComponent} from "./student/list-request/list-request.component";
import {ReceivesRequestComponent} from "./staff/receives-request/receives-request.component";
import {ShowRequestComponent} from "./staff/show-request/show-request.component";
import {StaffDashboardComponent} from "./staff/staff-dashboard/staff-dashboard.component";
import {StudentDashboardComponent} from "./student/student-dashboard/student-dashboard.component";
import {ShowRequestSecretaryComponent} from "./secretary/show-request-secretary/show-request-secretary.component";
import {
  ReceiveRequestSecretaryComponent
} from "./secretary/receive-request-secretary/receive-request-secretary.component";
import {ShowRequestStudentComponent} from "./student/show-request-student/show-request-student.component";
import {AddRequestComponent} from './student/add-individual-request/add-request.component';
import {ViewDeadlinesComponent} from "./secretary/view-deadlines/view-deadlines.component";
import {AddDeadlineComponent} from "./secretary/add-deadline/add-deadline.component";
import {ProfileComponent} from "./profile/profile.component";


const routes: Routes = [
  {
    path: 'student-dashboard',
    component: StudentDashboardComponent,
    data: {
      title: 'Ma liste des requêtes',
    }
  },

  {
    path: 'list-requests',
    component: ListRequestComponent,
    data: {
      title: 'Ma liste des requêtes'
    }
  },
  {
    path: 'add-individual-request',
    component: AddRequestComponent,
    data: {
      title: 'Nouvelle requête'
    }
  },

  {
    path: 'show-request/:id',
    component: ShowRequestStudentComponent,
    data: {
      title: 'voir ma requete'
    }
  },
  {
    path: 'profil',
    component: ProfileComponent,
    data: {
      title: 'profil page'
    }
  },


  // staff
  {
    path: 'staff/requests',
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
    path: 'staff/show-request/:id',
    component: ShowRequestComponent,
    data: {
      title: 'Voir la  requête'
    }
  },

  // secretary
  {
    path: 'secretary/requests',
    component: ReceiveRequestSecretaryComponent,
    data: {
      title: 'requete secretaire'
    }
  }, {
    path: 'show-request-secretary/:id',
    component: ShowRequestSecretaryComponent,
    data: {
      title: 'requete secretaire details'
    }
  }

  , {
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScreensRoutingModule {
}
