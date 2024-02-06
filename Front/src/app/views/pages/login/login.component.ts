import {Component} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../../features/services/shared/auth/auth.service";
import {MessageService} from "primeng/api";
import {Utils} from "../../../features/services/shared/utils/utils";
import {ILoginResponse} from "../../../features/models/login.response.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent {
  visible = false;
  dismissible = true;
  errorMessage: string | undefined;

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private utils: Utils
  ) {
  }

  // FIELDS VALIDATION
  get email() {
    return this.loginForm.controls['email'];
  }

  get password() {
    return this.loginForm.controls['password'];
  }

  // FUNCTION TO PERFORM THE LOGIN ACTION

  login() {
    const {email, password} = this.loginForm.value;
    this.authService.login(email!, password!).subscribe(
      (response) => {
        this.handleLogin(response);
      },
      (error) => {
        console.error('An error occurred. ' + error);
        this.showErrorMessage('An error occurred. Please try again later.');
      }
    );
  }

  handleLogin(response: ILoginResponse): void {
    this.utils.clearLocalStorage();
    if (response.isLogged) {
      const user = response.user;
      const token = response.token;
      const userRule = this.utils.getUserRule(user.rules);
      this.utils.setUserData(response);
      this.utils.gotoSpecificDashboard(userRule!);
    } else {
      this.showErrorMessage(response.message);
    }
  }

  // DISPLAY SOME ISSUE OR ERROR
  showErrorMessage(message: string): void {
    this.errorMessage = message;
    this.visible = true;
  }
}
