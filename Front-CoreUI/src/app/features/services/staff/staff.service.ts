import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {IGetStaffRequestsResponse, IStaffRequest} from "../../models/staffrequest.model";

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

  getRequestFromStudent(staffId: number): Observable<IGetStaffRequestsResponse> {
    return this.http.get<IGetStaffRequestsResponse>(`${this.baseUrl}/staff/${staffId}/requests`, {headers: this.headers});
  }

  getDetailsRequest(requestId: number): Observable<IStaffRequest> {
    return this.http.get<IStaffRequest>(`${this.baseUrl}/requests/${requestId}/`, {headers: this.headers});
  }

}
