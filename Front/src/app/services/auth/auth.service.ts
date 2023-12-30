import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserRoleConstants} from "../../constant/constant";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})


export class AuthService {

  private baseUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient, private router: Router) {
  }

  loginUser(email: string | null | undefined, password: string | null | undefined): Observable<any> {
    const body = {email, password};
    return this.http.post(`${this.baseUrl}/login`, body);
  }

  setUserData(data: any, token: string): void {
    localStorage.setItem('user', JSON.stringify(data.user));
    localStorage.setItem('token', token);
  }

  getUserRule(user: any): string | null {
    if (user && user.rules && user.rules.length > 0) {
      return user.rules[0].name;
    }
    return null;
  }

  gotoSpecificDashboard(userRule: string) {
    if (userRule === UserRoleConstants.STUDENT) {
      this.router.navigate(['/liste_requete'])
    } else if (userRule === UserRoleConstants.STAFF) {
      this.router.navigate(['enseignant'])
    } else if (userRule === UserRoleConstants.SECRETARY) {
      console.log('redirection ici secretaire');
    } else if (userRule === UserRoleConstants.TECHNICAL_ADMIN) {
      console.log('redirection ici admin ');
    }
  }

  // getUserData(): any {
  //   const user = localStorage.getItem('user');
  //   const token = localStorage.getItem('token');
  //   return { user: JSON.parse(user), token };
  // }


}
