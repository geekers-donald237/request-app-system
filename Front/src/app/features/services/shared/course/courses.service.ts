// course.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {ICourse} from "../../../models/student.school.model";

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private coursesSource = new BehaviorSubject<ICourse[]>([]);
  courses$ = this.coursesSource.asObservable();

  setCourses(courses: ICourse[]): void {
    this.coursesSource.next(courses);
  }
}
