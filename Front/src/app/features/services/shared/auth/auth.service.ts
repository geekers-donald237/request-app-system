import {catchError, Observable, throwError} from "rxjs";
import {ILoginResponse} from "../../../models/login.response.model";
import {ISubscribeNewsletterModel} from "../../../models/subscribe.newsletter.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8000/api';
  private token = localStorage.getItem('token');

  private headers = new HttpHeaders({
    'Accept': 'application/json',
    'Authorization': `Bearer ${this.token}`
  });

  constructor(private http: HttpClient) {
  }

  login(email: string, password: string): Observable<ILoginResponse> {
    const body = {email, password};
    return this.http.post<ILoginResponse>(`${this.baseUrl}/login`, body).pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }

  subscribeToNewsletter(email: string | null): Observable<ISubscribeNewsletterModel> {
    const url = `${this.baseUrl}/newsletter`;
    const data = {
      email: email
    };
    return this.http.post<ISubscribeNewsletterModel>(url, data, {headers: this.headers});
  }


  logout(): Observable<any> {
    const url = `${this.baseUrl}/logout`;
    return this.http.get(url);
  }

  updateUserProfile(profileData: any) {
    return this.http.post(`${this.baseUrl}/profile`, profileData);
  }

  deleteUserAccount() {
    return this.http.delete(`${this.baseUrl}/profile`);
  }

  updateUserPassword(passwordData: any) {
    return this.http.post(`${this.baseUrl}/update-password`, passwordData);
  }
}



