import {Component} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../../features/services/shared/auth/auth.service";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {Utils} from "../../../features/services/shared/utils/utils";

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
    private router: Router,
    private utils: Utils
  ) {
  }

  get email() {
    return this.loginForm.controls['email'];
  }

  get password() {
    return this.loginForm.controls['password'];
  }

  login() {
    const {email, password} = this.loginForm.value;
    this.authService.login(email!, password!).subscribe(
      (response) => {
        this.utils.clearLocalStorage();
        if (response.isLogged) {
          const user = response.user;
          const token = response.token;
          const userRule = this.utils.getUserRule(user.rules);
          this.utils.setUserData(response);
          this.utils.gotoSpecificDashboard(userRule!);
        } else {
          this.errorMessage = response.message; // Stocke le message d'erreur
          this.visible = true;
        }
      },
      (error) => {
        console.log('An error occurred. ' + error);
        this.errorMessage = 'An error occurred. Please try again later.'; // Message d'erreur générique
        this.visible = true;
      }
    );
  }
}
