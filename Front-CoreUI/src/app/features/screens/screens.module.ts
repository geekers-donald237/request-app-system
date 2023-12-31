import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScreensRoutingModule } from './screens-routing.module';
import {ListRequestComponent} from "./student/list-request/list-request.component";
import {AddIndividualRequestComponent} from "./student/add-individual-request/add-individual-request.component";
import {AddGroupRequestComponent} from "./student/add-group-request/add-group-request.component";
import {EditRequestComponent} from "./student/edit-request/edit-request.component";
import {DeadlinesComponent} from "./student/deadlines/deadlines.component";


@NgModule({
  declarations: [
      ListRequestComponent,
      AddIndividualRequestComponent,
      AddGroupRequestComponent,
      EditRequestComponent,
      DeadlinesComponent
  ],
  imports: [
    CommonModule,
    ScreensRoutingModule
  ]
})
export class ScreensModule { }
