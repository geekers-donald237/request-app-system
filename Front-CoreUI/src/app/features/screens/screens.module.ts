import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ScreensRoutingModule} from './screens-routing.module';
import {ListRequestComponent} from "./student/list-request/list-request.component";
import {AddIndividualRequestComponent} from "./student/add-individual-request/add-individual-request.component";
import {AddGroupRequestComponent} from "./student/add-group-request/add-group-request.component";
import {EditRequestComponent} from "./student/edit-request/edit-request.component";
import {DeadlinesComponent} from "./student/deadlines/deadlines.component";
import {HttpClientModule} from "@angular/common/http";
import {AddDeadlineComponent} from "./staff/add-deadline/add-deadline.component";

import {StaffDashboardComponent} from "./staff/staff-dashboard/staff-dashboard.component";
import {ViewDeadlinesComponent} from "./staff/view-deadlines/view-deadlines.component";
import {ReceivesRequestComponent} from "./staff/receives-request/receives-request.component";
import {DateFormatPipe} from "../services/shared/utils/date-format.pipe";
import {ShowRequestComponent} from "./staff/show-request/show-request.component";
import {
  AlertComponent,
  ButtonDirective,
  FormControlDirective,
  FormLabelDirective,
  InputGroupComponent
} from "@coreui/angular";
import {InputTextModule} from "primeng/inputtext";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    ListRequestComponent,
    AddIndividualRequestComponent,
    AddGroupRequestComponent,
    EditRequestComponent,
    DeadlinesComponent,
    AddDeadlineComponent,
    ReceivesRequestComponent,
    StaffDashboardComponent,
    ViewDeadlinesComponent,
    ShowRequestComponent,

  ],
  imports: [
    CommonModule,
    ScreensRoutingModule,
    HttpClientModule,
    DateFormatPipe,
    ButtonDirective,
    InputTextModule,
    ReactiveFormsModule,
    InputGroupComponent,
    FormLabelDirective,
    FormControlDirective,
    AlertComponent,
  ]
})
export class ScreensModule {
}
