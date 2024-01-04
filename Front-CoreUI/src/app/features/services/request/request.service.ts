import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {IGetStudentRequestResponse} from "../../models/student.request.model";
import {Observable} from "rxjs";
import {IRequestPatternsResponse} from "../../models/request.patterns.model";
import {ISaveRequestResponse} from "../../models/save.request.model";
import {ISendRequestResponse} from "../../models/send.request.model";
import {IStudentResponse} from "../../models/student.information.model";

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

  getRequestPatterns(): Observable<IRequestPatternsResponse> {
    const url = `${this.baseUrl}/request/patterns`;
    return this.http.get<IRequestPatternsResponse>(url, {headers: this.headers});
  }

  getRequestFromStudent(studentId: number): Observable<IGetStudentRequestResponse> {
    return this.http.get<IGetStudentRequestResponse>(`${this.baseUrl}/student/${studentId}/requests`, {headers: this.headers});
  }


  saveRequest(requestData: any): Observable<ISaveRequestResponse> {
    const url = `${this.baseUrl}/request`;
    return this.http.post<ISaveRequestResponse>(url, requestData, {headers: this.headers});
  }

  sendRequest(requestId: number, receiverIds: number[]): Observable<ISendRequestResponse> {
    const url = `${this.baseUrl}/request/send`;
    const data = {
      requestId: requestId,
      receiverIds: receiverIds
    };
    return this.http.post<ISendRequestResponse>(url, data, {headers: this.headers});
  }

  getStudentInformation(senderId: number): Observable<IStudentResponse> {
    const url = `${this.baseUrl}/student/${senderId}`;
    return this.http.get<IStudentResponse>(url,{headers: this.headers});
  }

}
