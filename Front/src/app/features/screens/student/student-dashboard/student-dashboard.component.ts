import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {WidgetsModule} from "../../../../views/widgets/widgets.module";

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [CommonModule, WidgetsModule],
  templateUrl: './student-dashboard.component.html',
  styleUrl: './student-dashboard.component.scss'
})
export class StudentDashboardComponent {

}
