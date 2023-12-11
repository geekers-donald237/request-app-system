import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // private apiUrl = 'http://votre-api-laravel.com/api'; // Remplacez avec votre URL API

  // constructor(private http: HttpClient) {}

  // auth(email: string, password: string): Observable<any> {
  //   const body = { email, password };
  //   return this.http.post(`${this.apiUrl}/auth`, body);
  // }

}