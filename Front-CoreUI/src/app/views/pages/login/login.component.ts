import {Component} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../../features/services/shared/auth/auth.service";
import {UserRoleConstants} from "../../../features/constant/constant";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]

})
export class LoginComponent {

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  })


  constructor(private fb: FormBuilder, private messageService: MessageService,
              private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  show() {
    this.messageService.add({severity: 'success', summary: 'Success', detail: 'Message Content'});
  }


  get email() {
    return this.loginForm.controls['email'];
  }

  get password() {
    return this.loginForm.controls['password'];
  }

  login() {
    const {email, password} = this.loginForm.value;
    this.authService.login(email, password).subscribe(
      (response) => {
        if (response.isLogged) {
          const user = response.user;
          const token = response.token;
          const userRule = this.getUserRule(user);
          this.setUserData(response, token);
          this.gotoSpecificDashboard(userRule!);

        } else {
          console.error(response.message);
        }
      },
      (error) => {
        console.log('An error occurred. Please try again later.');
      }
    );
  }

  private setUserData(data: any, token: string): void {
    localStorage.setItem('user', JSON.stringify(data.user));
    localStorage.setItem('token', token);
  }

  private getUserRule(user: any): string | null {
    if (user && user.rules && user.rules.length > 0) {
      return user.rules[0].name;
    }
    return null;
  }

  private gotoSpecificDashboard(userRule: string) {
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

}
