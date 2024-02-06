import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ScreensRoutingModule} from './screens-routing.module';
import {ListRequestComponent} from "./student/list-request/list-request.component";
import {HttpClientModule} from "@angular/common/http";
import {AddDeadlineComponent} from "./staff/add-deadline/add-deadline.component";

import {StaffDashboardComponent} from "./staff/staff-dashboard/staff-dashboard.component";
import {ViewDeadlinesComponent} from "./staff/view-deadlines/view-deadlines.component";
import {ReceivesRequestComponent} from "./staff/receives-request/receives-request.component";
import {DateFormatPipe} from "../services/shared/utils/date-format.pipe";
import {ShowRequestComponent} from "./staff/show-request/show-request.component";
import {
  AlertComponent,
  ButtonCloseDirective,
  ButtonDirective, CardBodyComponent, CardComponent, CardHeaderComponent, ColComponent,
  FormControlDirective,
  FormLabelDirective,
  InputGroupComponent,
  ModalBodyComponent,
  ModalComponent,
  ModalFooterComponent,
  ModalHeaderComponent,
  ModalTitleDirective, ModalToggleDirective, RowComponent
} from "@coreui/angular";
import {InputTextModule} from "primeng/inputtext";
import {ReactiveFormsModule} from "@angular/forms";
import {AddRequestComponent} from "./student/add-individual-request/add-request.component";
import {ShowRequestStudentComponent} from "./student/show-request-student/show-request-student.component";
import {DocsComponentsModule} from "@docs-components/docs-components.module";
import { ProfilComponent } from './profil/profil.component';


@NgModule({
  declarations: [
    ProfilComponent,
    ListRequestComponent,
    AddRequestComponent,
    AddDeadlineComponent,
    ReceivesRequestComponent,
    StaffDashboardComponent,
    ViewDeadlinesComponent,
    ShowRequestComponent,
    ShowRequestStudentComponent,
    
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
    ModalComponent,
    ModalHeaderComponent,
    ModalBodyComponent,
    ModalFooterComponent,
    ButtonCloseDirective,
    ModalTitleDirective,
    ModalToggleDirective,
    RowComponent,
    DocsComponentsModule,
    ColComponent,
    CardHeaderComponent,
    CardComponent,
    CardBodyComponent,
  ]
})
export class ScreensModule {
}
