// course.service.ts
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {IUe} from "../../../models/ue.model";
import {Utils} from "../utils/utils";
import {IStudentInfoResponse} from "../../../models/student.info.model";
import {AppService} from "../../app-services/app.service";

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private coursesSubject: BehaviorSubject<IUe[]> = new BehaviorSubject<IUe[]>([]);
  public courses$: Observable<IUe[]> = this.coursesSubject.asObservable();

  constructor(private ueService: AppService, private utils: Utils) {
  }

  fetchData(): void {
    const userId = this.utils.getUserIdFromLocalStorage();
    this.ueService.getStudentInfo(userId).subscribe(
      (response: IStudentInfoResponse) => {
        this.coursesSubject.next(response.data.courses);
      },
      (error) => {
        console.error('Erreur lors de la récupération des données :', error);
      }
    );
  }
}
