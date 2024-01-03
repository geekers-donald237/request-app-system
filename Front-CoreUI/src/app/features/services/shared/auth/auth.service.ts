import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {
  }

  login(email: string | null | undefined, password: string | null | undefined): Observable<any> {
    const body = {email, password};
    return this.http.post(`${this.baseUrl}/login`, body).pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }


}



