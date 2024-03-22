import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {IGetStudentRequestResponse} from "../../models/student.request.model";
import {IRequestPatternsResponse} from "../../models/request.patterns.model";
import {ISaveRequestResponse} from "../../models/save.request.model";
import {ISendRequestResponse} from "../../models/send.request.model";
import {IRequestDetailsResponse, IRequestResponse} from "../../models/request.model";
import {IDeleteRequestResponse} from "../../models/delete.request.model";
import {IRequestHistoryResponse} from "../../models/request.history.model";
import {IStudentResponse} from "../../models/student.model";
import {IUeResponse} from "../../models/ue.model";
import {IUpdateStatusResponse} from "../../models/update.request.state.model";


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

  sendRequest(requestId: number, ueId: number): Observable<ISendRequestResponse> {
    const url = `${this.baseUrl}/request/send`;
    const data = {
      requestId: requestId,
      ueId: ueId
    };
    return this.http.post<ISendRequestResponse>(url, data, {headers: this.headers});
  }

  getStudentInformation(senderId: number): Observable<IStudentResponse> {
    const url = `${this.baseUrl}/student/${senderId}`;
    return this.http.get<IStudentResponse>(url, {headers: this.headers});
  }

  getDetailsRequest(requestId: number): Observable<IRequestDetailsResponse> {
    return this.http.get<IRequestDetailsResponse>(`${this.baseUrl}/requests/${requestId}/`, {headers: this.headers});
  }

  updateRequestStatus(requestId: number, statut: string): Observable<IUpdateStatusResponse> {
    const url = `${this.baseUrl}/request/${requestId}/statut/${statut}`;
    return this.http.patch<IUpdateStatusResponse>(url, {}, {headers: this.headers});
  }

  deleteRequest(requestId: number): Observable<IDeleteRequestResponse> {
    const url = `${this.baseUrl}/request/${requestId}`;
    return this.http.delete<IDeleteRequestResponse>(url, {headers: this.headers});
  }

  getRequestReceiveByStaff(staffId: number): Observable<IRequestResponse> {
    return this.http.get<IRequestResponse>(`${this.baseUrl}/staff/${staffId}/requests`, {headers: this.headers});
  }

  getRequestReceiveBySecretary(secretaryId: number): Observable<IRequestResponse> {
    return this.http.get<IRequestResponse>(`${this.baseUrl}/secretary/${secretaryId}/requests`, {headers: this.headers});
  }

  getRequestHistory(requestId: number): Observable<IRequestHistoryResponse> {
    return this.http.get<IRequestHistoryResponse>(`${this.baseUrl}/requests/${requestId}/history`, {headers: this.headers});
  }


  getUesWithDeadlines(secretaryId: number): Observable<IUeResponse> {
    const url = `${this.baseUrl}/ues/${secretaryId}/deadline`;
    return this.http.get<IUeResponse>(url, {headers: this.headers});
  }

  getUesWithDeadlinesForStaff(staffId: number): Observable<IUeResponse> {
    const url = `${this.baseUrl}/staff/${staffId}/ues`;
    return this.http.get<IUeResponse>(url, {headers: this.headers});
  }

}
