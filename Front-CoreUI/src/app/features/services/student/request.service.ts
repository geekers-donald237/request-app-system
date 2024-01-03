import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {IGetAllStudentRequestResponse} from "../../models/studentrequest.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private baseUrl = 'http://localhost:8000/api';
  private token = localStorage.getItem('token');

  private headers = new HttpHeaders({
    'Accept': 'application/json',
    'Authorization': `Bearer ${this.token}`
  });

  constructor(private http: HttpClient, private router: Router) {
  }

  getRequestFromStudent(studentId: number): Observable<IGetAllStudentRequestResponse> {
    return this.http.get<IGetAllStudentRequestResponse>(`${this.baseUrl}/student/${studentId}/requests`, {headers: this.headers});
  }

  getRequestPattern(): Observable<any> {
    return this.http.get<any>('/request/patterns', {headers: this.headers});
  }

  sendRequest(requestData: any): Observable<any>{
    const url = `${this.baseUrl}/request`;
    return this.http.post(url, requestData, {headers: this.headers});
  }
}
