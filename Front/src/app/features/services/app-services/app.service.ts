import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {IAddDeadlineResponse} from "../../models/add.deadline.model";
import {IDeleteRequestResponse} from "../../models/delete.request.model";
import {IGetStudentRequestResponse} from "../../models/student.request.model";
import {ILoginResponse} from "../../models/login.response.model";
import {IRequestResponse} from "../../models/request.model";
import {IRequestHistoryResponse} from "../../models/request.history.model";
import {ISaveRequestResponse} from "../../models/save.request.model";
import {ISendRequestResponse} from "../../models/send.request.model";
import {ISubscribeNewsletterModel} from "../../models/subscribe.newsletter.model";
import {IUeResponse} from "../../models/ue.model";
import {IUpdateDeadlineResponse} from "../../models/update.deadline.model";
import {IUpdatePasswordModel} from "../../models/update.password.model";
import {IUpdateStatusResponse} from "../../models/update.request.state.model";
import {IStudentInfoResponse} from "../../models/student.info.model";
import {IStudentResponse} from "../../models/student.model";
import {IRequestPatternsResponse} from "../../models/request.patterns.model";

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) {
  }

  // Authentification et gestion du profil utilisateur
  login(email: string, password: string): Observable<ILoginResponse> {
    const body = {email, password};
    return this.http.post<ILoginResponse>(`${environment.baseUrl}/login`, body);
  }

  logout(): Observable<any> {
    const url = `${environment.baseUrl}/logout`;
    return this.http.post(url, '', {headers: environment.headers});
  }

  updateUserProfile(profileData: any): Observable<any> {
    return this.http.post(`${environment.baseUrl}/profile`, profileData, {headers: environment.headers});
  }

  deleteUserAccount(): Observable<any> {
    return this.http.delete(`${environment.baseUrl}/profile`, {headers: environment.headers});
  }

  updateUserPassword(passwordData: FormData): Observable<IUpdatePasswordModel> {
    return this.http.post<IUpdatePasswordModel>(`${environment.baseUrl}/update-password`, passwordData, {headers: environment.headers});
  }

  subscribeToNewsletter(email: string | null): Observable<ISubscribeNewsletterModel> {
    const data = {email};
    return this.http.post<ISubscribeNewsletterModel>(`${environment.baseUrl}/newsletter`, data, {headers: environment.headers});
  }

  // Gestion des demandes
  getRequestPatterns(): Observable<IRequestPatternsResponse> {
    return this.http.get<IRequestPatternsResponse>(`${environment.baseUrl}/request/patterns`, {headers: environment.headers});
  }

  getRequestFromStudent(studentId: number): Observable<IGetStudentRequestResponse> {
    return this.http.get<IGetStudentRequestResponse>(`${environment.baseUrl}/student/${studentId}/requests`, {headers: environment.headers});
  }

  saveRequest(requestData: any): Observable<ISaveRequestResponse> {
    return this.http.post<ISaveRequestResponse>(`${environment.baseUrl}/request`, requestData, {headers: environment.headers});
  }

  sendRequest(requestId: number, ueId: number): Observable<ISendRequestResponse> {
    const data = {requestId, ueId};
    return this.http.post<ISendRequestResponse>(`${environment.baseUrl}/request/send`, data, {headers: environment.headers});
  }


  updateRequestStatus(requestId: number, statut: string): Observable<IUpdateStatusResponse> {
    const url = `${environment.baseUrl}/request/${requestId}/statut/${statut}`;
    return this.http.patch<IUpdateStatusResponse>(url, {}, {headers: environment.headers});
  }

  deleteRequest(requestId: number): Observable<IDeleteRequestResponse> {
    const url = `${environment.baseUrl}/request/${requestId}`;
    return this.http.delete<IDeleteRequestResponse>(url, {headers: environment.headers});
  }

  getRequestReceiveByStaff(staffId: number): Observable<IRequestResponse> {
    return this.http.get<IRequestResponse>(`${environment.baseUrl}/staff/${staffId}/requests`, {headers: environment.headers});
  }

  getRequestReceiveBySecretary(secretaryId: number): Observable<IRequestResponse> {
    return this.http.get<IRequestResponse>(`${environment.baseUrl}/secretary/${secretaryId}/requests`, {headers: environment.headers});
  }

  getRequestHistory(requestId: number): Observable<IRequestHistoryResponse> {
    return this.http.get<IRequestHistoryResponse>(`${environment.baseUrl}/requests/${requestId}/history`, {headers: environment.headers});
  }

  // Gestion des étudiants et des UE
  getStudentInformation(senderId: number): Observable<IStudentResponse> {
    return this.http.get<IStudentResponse>(`${environment.baseUrl}/student/${senderId}`, {headers: environment.headers});
  }

  getUesWithDeadlines(secretaryId: number): Observable<IUeResponse> {
    return this.http.get<IUeResponse>(`${environment.baseUrl}/ues/${secretaryId}/deadline`, {headers: environment.headers});
  }

  getUesWithDeadlinesForStaff(staffId: number): Observable<IUeResponse> {
    return this.http.get<IUeResponse>(`${environment.baseUrl}/staff/${staffId}/ues`, {headers: environment.headers});
  }

  getStudentInfo(studentId: number): Observable<IStudentInfoResponse> {
    return this.http.get<IStudentInfoResponse>(`${environment.baseUrl}/student/${studentId}/student`, {headers: environment.headers});
  }

  // Gestion des délais
  createDeadline(secretaryId: number, deadlineData: any): Observable<IAddDeadlineResponse> {
    return this.http.post<IAddDeadlineResponse>(`${environment.baseUrl}/ues/${secretaryId}/deadline`, deadlineData, {headers: environment.headers});
  }

  updateDeadline(ueId: number, updatedDeadlineData: any): Observable<IUpdateDeadlineResponse> {
    return this.http.post<IUpdateDeadlineResponse>(`${environment.baseUrl}/ues/${ueId}/deadline/update`, updatedDeadlineData, {headers: environment.headers});
  }
}
