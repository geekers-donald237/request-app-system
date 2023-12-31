import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListRequestComponent} from "./student/list-request/list-request.component";
import {AddIndividualRequestComponent} from "./student/add-individual-request/add-individual-request.component";
import {AddGroupRequestComponent} from "./student/add-group-request/add-group-request.component";
import {EditRequestComponent} from "./student/edit-request/edit-request.component";
import {DeadlinesComponent} from "./student/deadlines/deadlines.component";
import {StaffDashboardComponent} from "./staff/staff-dashboard/staff-dashboard.component";
import {ReceivesRequestComponent} from "./staff/receives-request/receives-request.component";
import {AddDeadlineComponent} from "./staff/add-deadline/add-deadline.component";
import {ViewDeadlinesComponent} from "./staff/view-deadlines/view-deadlines.component";

const routes: Routes = [
  {
    path: 'student/requests',
    component: ListRequestComponent,
    data: {
      title: 'Mes requêtes'
    }
  },
  {
    path: 'add-individual-request',
    component: AddIndividualRequestComponent,
    data: {
      title: 'Nouvelle requête individuelle'
    }
  },
  {
    path: 'add-group-request',
    component: AddGroupRequestComponent,
    data: {
      title: 'Nouvelle requête de groupe'
    }
  },
  {
    path: 'edit-request',
    component: EditRequestComponent,
    data: {
      title: 'Editer ma requête'
    }
  },
  {
    path: 'calendar',
    component: DeadlinesComponent,
    data: {
      title: 'Echéances de requêtes'
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

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScreensRoutingModule {
}
