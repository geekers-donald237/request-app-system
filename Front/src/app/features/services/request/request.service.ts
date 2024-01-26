import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { IGetStudentRequestResponse } from "../../models/student.request.model";
import { IRequestPatternsResponse } from "../../models/request.patterns.model";
import { ISaveRequestResponse } from "../../models/save.request.model";
import { ISendRequestResponse } from "../../models/send.request.model";
import { IStudentResponse } from "../../models/student.information.model";
import { IRequestDetailsResponse } from "../../models/request.model";
import { IUpdateStatusResponse } from "../../models/request.status.model";
import {IDeleteRequestApiResponse} from "../../models/delete.request.model";
import {IGetPersonnRequestsResponse} from "../../models/staff.request.model";

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

  deleteRequest(requestId: number): Observable<IDeleteRequestApiResponse> {
    const url = `${this.baseUrl}/request/${requestId}`;
    return this.http.delete<IDeleteRequestApiResponse>(url, {headers: this.headers});
  }

  getRequestReceiveByStaff(staffId: number): Observable<IGetPersonnRequestsResponse> {
    return this.http.get<IGetPersonnRequestsResponse>(`${this.baseUrl}/staff/${staffId}/requests`, {headers: this.headers});
  }

  getRequestReceiveBySecretary(secretaryId: number): Observable<IGetPersonnRequestsResponse> {
    return this.http.get<IGetPersonnRequestsResponse>(`${this.baseUrl}/secretary/${secretaryId}/requests`, {headers: this.headers});
  }


}
