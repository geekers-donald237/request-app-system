import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {ILoginResponse} from "../../../models/login.response.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {
  }

  login(email: string , password: string): Observable<ILoginResponse> {
    const body = {email, password};
    return this.http.post<ILoginResponse>(`${this.baseUrl}/login`, body).pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }
}



