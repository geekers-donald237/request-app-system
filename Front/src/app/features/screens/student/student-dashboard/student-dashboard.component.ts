import {Component, OnInit} from '@angular/core';
import {Utils} from "../../../services/shared/utils/utils";
import {UeService} from "../../../services/ue/ue.service";
import {BadgeStatus} from "../../../services/shared/utils/badge.status";
import {IUe} from "../../../models/ue.model";
import {IStudentInfoResponse} from "../../../models/student.info.model";

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrl: './student-dashboard.component.scss'
})
export class StudentDashboardComponent implements OnInit {
  courses: IUe[] = [];
  badgeStatus: BadgeStatus | undefined;

  constructor(private utils: Utils, private ueService: UeService) {
  }

  ngOnInit(): void {
    this.fetchData();
  }

  private fetchData(): void {
    const userId = this.utils.getUserIdFromLocalStorage();
    this.ueService.getStudentInfo(userId).subscribe(
      (studentSchoolData: IStudentInfoResponse) => {
        this.courses = studentSchoolData.data.ue;
        console.log(this.courses);
      },
      (error) => {
        console.error('Erreur lors de la récupération des données:', error);
      }
    );
  }
}
