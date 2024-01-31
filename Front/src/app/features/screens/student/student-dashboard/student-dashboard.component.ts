import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {WidgetsModule} from "../../../../views/widgets/widgets.module";
import {CourseService} from "../../../services/shared/course/courses.service";
import {ICourse, IStudentSchoolDataResponse} from "../../../models/student.school.model";
import {forkJoin} from "rxjs";
import {IRequestPatternsResponse} from "../../../models/request.patterns.model";
import {Utils} from "../../../services/shared/utils/utils";
import {UeService} from "../../../services/ue/ue.service";

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [CommonModule, WidgetsModule],
  templateUrl: './student-dashboard.component.html',
  styleUrl: './student-dashboard.component.scss'
})
export class StudentDashboardComponent implements  OnInit{
  courses: ICourse[] = [];

  constructor(private courseService: CourseService , private utils:Utils , private ueService :UeService) {
  }

  ngOnInit(): void {
    this.fetchData()
  }

  private fetchData(): void {
    const userId = this.utils.getUserIdFromLocalStorage();

    // Utilisez votre service de requête DB pour récupérer les données
    this.ueService.getStudentInfo(userId).subscribe(
      (studentSchoolData: IStudentSchoolDataResponse) => {
        this.courses = studentSchoolData.data.courses;
        // this.courseService.setCourses(this.courses);

      },
      (error) => {
        console.error('Erreur lors de la récupération des données:', error);
      }
    );
  }

  getStatusBadgeClass(publicationDate: string, deadline: string): string {
    const startDate = new Date(publicationDate);
    const endDate = new Date(deadline);

    if (!this.isRequestIntervalValid(startDate, endDate)) {
      return 'badge badge-danger'; // Intervalle expiré
    } else {
      return 'badge badge-success'; // Intervalle en cours
    }
  }

  // Fonction pour obtenir le libellé du badge en fonction des dates
  getStatusLabel(publicationDate: string, deadline: string): string {
    const startDate = new Date(publicationDate);
    const endDate = new Date(deadline);

    if (!this.isRequestIntervalValid(startDate, endDate)) {
      return 'Terminé'; // Intervalle expiré
    } else {
      return 'En cours'; // Intervalle en cours
    }
  }

  isRequestIntervalValid(startDate: Date, endDate: Date): boolean {
    const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
    return timeDiff >= 0;
  }
}
