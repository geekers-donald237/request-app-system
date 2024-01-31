import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IAddDeadlineResponse} from "../../models/add.deadline.model";
import {environment} from "../../../../environments/environment";
import {IStudentInfoResponse} from "../../models/student.info.model";

@Injectable({
  providedIn: 'root'
})
export class UeService {


  constructor(private http: HttpClient) {
  }

  getStudentInfo(studentId: number): Observable<IStudentInfoResponse> {

    const url = `${environment.baseUrl}/student/${studentId}/student`;
    return this.http.get<IStudentInfoResponse>(url, {headers: environment.headers});
  }

  createDeadline(secretaryId: number, deadlineData: any): Observable<IAddDeadlineResponse> {
    const url = `${environment.baseUrl}/ues/${secretaryId}/deadline`;
    return this.http.post<IAddDeadlineResponse>(url, deadlineData, {headers: environment.headers});
  }
}
