import {Router} from '@angular/router';
import {UserRoleConstants} from "../../../constant/constant";
import {Injectable} from "@angular/core";
import {ILoginResponse} from "../../../models/login.response.model";
import {IRequestPattern} from "../../../models/request.patterns.model";
import {IUser} from "../../../models/user.model";
import {IUserRole} from "../../../models/user.role.model";

@Injectable({
  providedIn: 'root',
})
export class Utils {
  constructor(private router: Router) {
  }

  public getUserRule(userRoles: IUserRole[]): string | null {
    if (userRoles && userRoles.length > 0) {
      return userRoles[0].name;
    }
    return null;
  }

  public gotoSpecificDashboard(userRule: string) {
    switch (userRule) {
      case UserRoleConstants.STUDENT:
        this.router.navigate(['/app/student-dashboard']);
        break;
      case UserRoleConstants.STAFF:
        this.router.navigate(['/app/staff/requests']);
        break;
      case UserRoleConstants.SECRETARY:
        this.router.navigate(['/app/secretary/requests']);
        break;
      case UserRoleConstants.TECHNICAL_ADMIN:
        console.log('redirection ici admin');
        break;
      default:
        console.log('Role non reconnu');
        break;
    }
  }

  public setUserData(data: ILoginResponse): void {
    localStorage.setItem('user', JSON.stringify(data.user));
    localStorage.setItem('token', data.token);
  }

  public getUserIdFromLocalStorage(): number {
    const userDataString = localStorage.getItem('user');
    const userData = userDataString ? JSON.parse(userDataString) : null;
    return userData ? parseInt(userData.id) : 0;
  }

  public getUserFromLocalStorage(): IUser {
    const userDataString = localStorage.getItem('user');
    return userDataString ? JSON.parse(userDataString) : null;
  }

  public clearLocalStorage(): void {
    localStorage.clear();
  }

  getRequestPatternById(patternId: number, requestPatterns: IRequestPattern[]): string {
    const pattern = requestPatterns.find((p) => p.id === patternId);
    return pattern ? pattern.pattern_description : 'Non défini';
  }

  public loadRequestIdFromLocalStorage(): number {
    return  Number(localStorage.getItem('requestId'));
  }



}
