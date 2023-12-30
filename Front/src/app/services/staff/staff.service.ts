import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  requests: any[] = [];
  private baseUrl = 'http://localhost:8000/api';  // Remplacez par votre URL de base

  constructor(private http: HttpClient) {
  }

  getStaffRequests(staffId: number): Observable<any> {
    // const token = localStorage.getItem('token');
    const token = '33|SdscNel9EF6SLKsX5bNFtwfn2CMvGJO27kH4hpWL1615385d';
    if (!token) {
      return throwError('Token not found');
    }

    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    const url = `${this.baseUrl}/staff/${staffId}/requests`;

    return this.http.get(url, {headers});
  }
}
