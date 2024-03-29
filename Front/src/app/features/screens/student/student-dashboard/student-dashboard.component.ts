import {Component, OnInit} from '@angular/core';
import {BadgeStatus} from "../../../services/shared/utils/badge.status";
import {IUe} from "../../../models/ue.model";
import {DateUtils} from "../../../services/shared/utils/date";
import {CourseService} from "../../../services/shared/course/courses.service";

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.scss']
})
export class StudentDashboardComponent implements OnInit {
  courses: IUe[] = [];
  badgeStatus: BadgeStatus;
  pageIsLoad = true;
  date: DateUtils | undefined;

  constructor(private courseService: CourseService) {
    this.badgeStatus = new BadgeStatus(this.date!);
  }

  ngOnInit(): void {
    this.loadCoursesFromCoursesService();
  }

  // LOAD COURSES FROM SERVICES HANDLING
  private loadCoursesFromCoursesService() {
    this.courseService.fetchData();
    this.courseService.courses$.subscribe((courses) => {
      this.courses = courses;
    });
    setTimeout(() => {
      this.pageIsLoad = false;
    }, 2000);
  }
}
