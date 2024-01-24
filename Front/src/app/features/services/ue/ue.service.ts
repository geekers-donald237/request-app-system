import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {IStudentSchoolDataResponse} from "../../models/student.school.model";

@Injectable({
  providedIn: 'root'
})
export class UeService {

  private baseUrl = 'http://localhost:8000/api';
  private token = localStorage.getItem('token');

  private headers = new HttpHeaders({
    'Accept': 'application/json',
    'Authorization': `Bearer ${this.token}`
  });
  constructor(private http: HttpClient) { }

  getStudentInfo(studentId: number): Observable<IStudentSchoolDataResponse> {
    const url = `${this.baseUrl}/student/${studentId}/studentDetails`;
    return this.http.get<IStudentSchoolDataResponse>(url, { headers: this.headers });
  }
}
