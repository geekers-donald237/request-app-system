import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ScreensRoutingModule} from './screens-routing.module';
import {ListRequestComponent} from "./student/list-request/list-request.component";
import {HttpClientModule} from "@angular/common/http";

import {StaffDashboardComponent} from "./staff/staff-dashboard/staff-dashboard.component";
import {ReceivesRequestComponent} from "./staff/receives-request/receives-request.component";
import {ShowRequestComponent} from "./staff/show-request/show-request.component";
import {
  AlertComponent,
  ButtonCloseDirective,
  ButtonDirective,
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ColComponent,
  FormControlDirective,
  FormLabelDirective,
  InputGroupComponent,
  ModalBodyComponent,
  ModalComponent,
  ModalFooterComponent,
  ModalHeaderComponent,
  ModalTitleDirective,
  ModalToggleDirective,
  RowComponent
} from "@coreui/angular";
import {InputTextModule} from "primeng/inputtext";
import {ReactiveFormsModule} from "@angular/forms";
import {AddRequestComponent} from "./student/add-individual-request/add-request.component";
import {ShowRequestStudentComponent} from "./student/show-request-student/show-request-student.component";
import {DocsComponentsModule} from "@docs-components/docs-components.module";
import {ViewDeadlinesComponent} from "./secretary/view-deadlines/view-deadlines.component";
import {AddDeadlineComponent} from "./secretary/add-deadline/add-deadline.component";
import {StudentDashboardComponent} from "./student/student-dashboard/student-dashboard.component";
import {WidgetsModule} from "../../views/widgets/widgets.module";
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";


@NgModule({
  declarations: [
    ListRequestComponent,
    AddRequestComponent,
    AddDeadlineComponent,
    ReceivesRequestComponent,
    StaffDashboardComponent,
    StudentDashboardComponent,
    ViewDeadlinesComponent,
    ShowRequestComponent,
    ShowRequestStudentComponent,
  ],
  imports: [
    CommonModule,
    ScreensRoutingModule,
    HttpClientModule,
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
    WidgetsModule,
    ButtonModule,
    DialogModule,
  ]
})
export class ScreensModule {
}
