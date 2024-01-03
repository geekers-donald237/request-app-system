import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {IGetAllStudentRequestResponse} from "../../models/studentrequest.model";
import {Observable} from "rxjs";
import {IGetStaffResponse} from "../../models/staffmember.model";

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

  constructor(private http: HttpClient) {
  }

  getRequestFromStudent(studentId: number): Observable<IGetAllStudentRequestResponse> {
    return this.http.get<IGetAllStudentRequestResponse>(`${this.baseUrl}/student/${studentId}/requests`, {headers: this.headers});
  }

  getRequestPatterns(): Observable<any> {
    const url = `${this.baseUrl}/request/patterns`;
    return this.http.get(url, {headers: this.headers});
  }

  sendRequest(requestData: any): Observable<any> {
    const url = `${this.baseUrl}/request`;
    return this.http.post(url, requestData, {headers: this.headers});
  }

  saveRequestDetails(requestId: number, receiverIds: number[]): Observable<any> {
    const url = `${this.baseUrl}/request/send`;
    const data = {
      requestId: requestId,
      receiverIds: receiverIds
    };

    return this.http.post(url, data, {headers: this.headers});
  }

  getAllStaff(): Observable<IGetStaffResponse> {
    const url = `${this.baseUrl}/staff`;
    return this.http.get<IGetStaffResponse>(url , {headers: this.headers});
  }
}
