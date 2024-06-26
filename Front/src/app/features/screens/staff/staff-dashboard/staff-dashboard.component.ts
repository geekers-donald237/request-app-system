import {Component, OnInit} from '@angular/core';
import {IUe} from "../../../models/ue.model";
import {BadgeStatus} from "../../../services/shared/utils/badge.status";
import {DateUtils} from "../../../services/shared/utils/date";
import {Utils} from "../../../services/shared/utils/utils";
import {AppService} from "../../../services/app-services/app.service";

@Component({
  selector: 'app-staff-dashboard',
  templateUrl: './staff-dashboard.component.html',
  styleUrl: './staff-dashboard.component.scss'
})
export class StaffDashboardComponent implements OnInit {
  courses: IUe[] = [];
  badgeStatus: BadgeStatus;
  date: DateUtils | undefined;
  pageIsLoad = true;

  constructor(private appService: AppService, private utils: Utils) {
    this.badgeStatus = new BadgeStatus(this.date!);
  }

  ngOnInit(): void {
    this.loadData()
  }

  loadData() {
    this.getUeFromStaff()
  }

  // GET UE FROM STAFF
  getUeFromStaff() {
    const staffId = this.utils.getUserIdFromLocalStorage();
    this.appService.getUesWithDeadlinesForStaff(staffId).subscribe(
      (uesWithDeadlines) => {
        this.courses = uesWithDeadlines.ues;
        console.log(this.courses);
      }, (error) => {
        console.log('An error occurred. Please try again later.');
      });
    setTimeout(() => {
      this.pageIsLoad = false;
    }, 2000);
  }
}
