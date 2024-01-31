// course.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {IUe} from "../../../models/ue.model";

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private coursesSource = new BehaviorSubject<IUe[]>([]);
  courses$ = this.coursesSource.asObservable();

  setCourses(courses: IUe[]): void {
    this.coursesSource.next(courses);
  }
}
