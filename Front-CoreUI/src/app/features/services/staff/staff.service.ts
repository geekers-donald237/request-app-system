import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {IGetStaffRequestsResponse, IStaffRequest} from "../../models/staff.request.model";
import {IGetStaffResponse} from "../../models/staff.member.model";

@Injectable({
  providedIn: 'root'
})
export class StaffService {
  private baseUrl = 'http://localhost:8000/api';
  private token = localStorage.getItem('token');

  private headers = new HttpHeaders({
    'Accept': 'application/json',
    'Authorization': `Bearer ${this.token}`
  });

  constructor(private http: HttpClient, private router: Router) {
  }

  getStaffMembers(): Observable<IGetStaffResponse> {
    const url = `${this.baseUrl}/staff`;
    return this.http.get<IGetStaffResponse>(url , {headers: this.headers});
  }

  getRequestFromStudent(staffId: number): Observable<IGetStaffRequestsResponse> {
    return this.http.get<IGetStaffRequestsResponse>(`${this.baseUrl}/staff/${staffId}/requests`, {headers: this.headers});
  }

  getDetailsRequest(requestId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/requests/${requestId}/`, {headers: this.headers});
  }

  updateRequestStatus(requestId: number, statut: string): Observable<any> {
    const url = `${this.baseUrl}/request/${requestId}/statut/${statut}`;
    return this.http.patch(url, {},{headers: this.headers});
  }

}
