import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {IAddDeadlineResponse, IUpdateDeadlineResponse} from "../../models/add.deadline.model";
import {IStudentInfoResponse} from "../../models/student.info.model";

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

  constructor(private http: HttpClient) {

  }


  getStudentInfo(studentId: number): Observable<IStudentInfoResponse> {

    const url = `${this.baseUrl}/student/${studentId}/student`;
    return this.http.get<IStudentInfoResponse>(url, {headers: this.headers});
  }

  createDeadline(secretaryId: number, deadlineData: any): Observable<IAddDeadlineResponse> {
    const url = `${this.baseUrl}/ues/${secretaryId}/deadline`;
    return this.http.post<IAddDeadlineResponse>(url, deadlineData, {headers: this.headers});
  }

  updateDeadline(ueId: number, updatedDeadlineData: any): Observable<IUpdateDeadlineResponse> {
    const url = `${this.baseUrl}/ues/${ueId}/deadline/update`;
    return this.http.post<IUpdateDeadlineResponse>(url, updatedDeadlineData, {headers: this.headers});
  }
}
