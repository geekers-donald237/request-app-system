import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IGetStudentRequestResponse} from "../../models/student.request.model";
import {IRequestPatternsResponse} from "../../models/request.patterns.model";
import {ISaveRequestResponse} from "../../models/save.request.model";
import {ISendRequestResponse} from "../../models/send.request.model";
import {IRequestDetailsResponse} from "../../models/request.model";
import {IUpdateStatusResponse} from "../../models/request.status.model";
import {IDeleteRequestApiResponse} from "../../models/delete.request.model";
import {IGetPersonnRequestsResponse} from "../../models/staff.request.model";
import {IRequestHistoryResponse} from "../../models/request.history.model";
import {IUserResponse} from "../../models/staff.member.model";
import {IUesWithDeadlinesResponse} from "../../models/get.ue.with.deadline.model";
import {IStudentResponse} from "../../models/student.model";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RequestService {


  constructor(private http: HttpClient) {
  }

  getRequestPatterns(): Observable<IRequestPatternsResponse> {
    const url = `${environment.baseUrl}/request/patterns`;
    return this.http.get<IRequestPatternsResponse>(url, {headers: environment.headers});
  }

  getRequestFromStudent(studentId: number): Observable<IGetStudentRequestResponse> {
    return this.http.get<IGetStudentRequestResponse>(`${environment.baseUrl}/student/${studentId}/requests`, {headers: environment.headers});
  }

  saveRequest(requestData: any): Observable<ISaveRequestResponse> {
    const url = `${environment.baseUrl}/request`;
    return this.http.post<ISaveRequestResponse>(url, requestData, {headers: environment.headers});
  }

  sendRequest(requestId: number, ueId: number): Observable<ISendRequestResponse> {
    const url = `${environment.baseUrl}/request/send`;
    const data = {
      requestId: requestId,
      ueId: ueId
    };
    return this.http.post<ISendRequestResponse>(url, data, {headers: environment.headers});
  }

  getStudentInformation(senderId: number): Observable<IStudentResponse> {
    const url = `${environment.baseUrl}/student/${senderId}`;
    return this.http.get<IStudentResponse>(url, {headers: environment.headers});
  }

  getDetailsRequest(requestId: number): Observable<IRequestDetailsResponse> {
    return this.http.get<IRequestDetailsResponse>(`${environment.baseUrl}/requests/${requestId}/`, {headers: environment.headers});
  }

  updateRequestStatus(requestId: number, statut: string): Observable<IUpdateStatusResponse> {
    const url = `${environment.baseUrl}/request/${requestId}/statut/${statut}`;
    return this.http.patch<IUpdateStatusResponse>(url, {}, {headers: environment.headers});
  }

  deleteRequest(requestId: number): Observable<IDeleteRequestApiResponse> {
    const url = `${environment.baseUrl}/request/${requestId}`;
    return this.http.delete<IDeleteRequestApiResponse>(url, {headers: environment.headers});
  }

  getRequestReceiveByStaff(staffId: number): Observable<IGetPersonnRequestsResponse> {
    return this.http.get<IGetPersonnRequestsResponse>(`${environment.baseUrl}/staff/${staffId}/requests`, {headers: environment.headers});
  }

  getRequestReceiveBySecretary(secretaryId: number): Observable<IGetPersonnRequestsResponse> {
    return this.http.get<IGetPersonnRequestsResponse>(`${environment.baseUrl}/secretary/${secretaryId}/requests`, {headers: environment.headers});
  }

  getRequestHistory(requestId: number): Observable<IRequestHistoryResponse> {
    return this.http.get<IRequestHistoryResponse>(`${environment.baseUrl}/requests/${requestId}/history`, {headers: environment.headers});
  }

  getUsers(): Observable<IUserResponse> {
    const url = `${environment.baseUrl}/users`;
    return this.http.get<IUserResponse>(url, {headers: environment.headers});
  }

  getUesWithDeadlines(secretaryId: number): Observable<IUesWithDeadlinesResponse> {
    const url = `${environment.baseUrl}/ues/${secretaryId}/deadline`;
    return this.http.get<IUesWithDeadlinesResponse>(url, {headers: environment.headers});
  }


}
