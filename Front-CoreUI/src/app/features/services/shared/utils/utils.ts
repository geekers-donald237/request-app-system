import {Router} from '@angular/router';
import {UserRoleConstants} from "../../../constant/constant";
import {Injectable} from "@angular/core";
import {ILoginResponse, IUserRole} from "../../../models/login.response.model";

@Injectable({
  providedIn: 'root', // This makes Utils available throughout the application
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
        this.router.navigate(['/app/list-requests']);
        break;
      case UserRoleConstants.STAFF:
        this.router.navigate(['/app/requests']);
        break;
      case UserRoleConstants.SECRETARY:
        console.log('redirection ici secretaire');
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


}
