import {HttpClient} from "@angular/common/http";
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
import {IUserResponse} from "../../models/user.model";
import {IUpdateStatusResponse} from "../../models/update.request.state.model";
import {Injectable} from "@angular/core";
import {IStudentInfoResponse} from "../../models/student.info.model";
import {IAddDeadlineResponse} from "../../models/add.deadline.model";
import {IUpdateDeadlineResponse} from "../../models/update.deadline.model";
import {ILoginResponse} from "../../models/login.response.model";
import {ISubscribeNewsletterModel} from "../../models/subscribe.newsletter.model";
import {IUpdatePasswordModel} from "../../models/update.password.model";
import {environment} from "../../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class AppService {

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

  getUsers(): Observable<IUserResponse> {
    const url = `${environment.baseUrl}/users`;
    return this.http.get<IUserResponse>(url, {headers: environment.headers});
  }

  getUesWithDeadlines(secretaryId: number): Observable<IUeResponse> {
    const url = `${environment.baseUrl}/ues/${secretaryId}/deadline`;
    return this.http.get<IUeResponse>(url, {headers: environment.headers});
  }

  getUesWithDeadlinesForStaff(staffId: number): Observable<IUeResponse> {
    const url = `${environment.baseUrl}/staff/${staffId}/ues`;
    return this.http.get<IUeResponse>(url, {headers: environment.headers});
  }


  getStudentInfo(studentId: number): Observable<IStudentInfoResponse> {

    const url = `${environment.baseUrl}/student/${studentId}/student`;
    return this.http.get<IStudentInfoResponse>(url, {headers: environment.headers});
  }

  createDeadline(secretaryId: number, deadlineData: any): Observable<IAddDeadlineResponse> {
    const url = `${environment.baseUrl}/ues/${secretaryId}/deadline`;
    return this.http.post<IAddDeadlineResponse>(url, deadlineData, {headers: environment.headers});
  }

  updateDeadline(ueId: number, updatedDeadlineData: any): Observable<IUpdateDeadlineResponse> {
    const url = `${environment.baseUrl}/ues/${ueId}/deadline/update`;
    return this.http.post<IUpdateDeadlineResponse>(url, updatedDeadlineData, {headers: environment.headers});
  }


  login(email: string, password: string): Observable<ILoginResponse> {
    const body = {email, password};
    return this.http.post<ILoginResponse>(`${environment.baseUrl}/login`, body);
  }

  updateUserProfile(profileData: any) {
    return this.http.post(`${environment.baseUrl}/profile`, profileData, {headers: environment.headers});
  }

  subscribeToNewsletter(email: string | null): Observable<ISubscribeNewsletterModel> {
    const url = `${environment.baseUrl}/newsletter`;
    const data = {
      email: email
    };
    return this.http.post<ISubscribeNewsletterModel>(url, data, {headers: environment.headers});
  }

  deleteUserAccount() {
    return this.http.delete(`${environment.baseUrl}/profile`, {headers: environment.headers});
  }

  updateUserPassword(passwordData: FormData) {
    return this.http.post<IUpdatePasswordModel>(`${environment.baseUrl}/update-password`, passwordData, {headers: environment.headers});
  }

  logout(): Observable<any> {
    const url = `${environment.baseUrl}/logout`;
    return this.http.post(url, '', {headers: environment.headers});
  }

}
