import {Component} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth/auth.service";
import {ToastersComponent} from "../../notifications/toasters/toasters.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  })

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  get email() {
    return this.loginForm.controls['email'];
  }

  get password() {
    return this.loginForm.controls['password'];
  }

  login() {
    const {email, password} = this.loginForm.value;
    // this.showToast();
    this.authService.loginUser(email, password).subscribe(
      (response) => {
        if (response.isLogged) {
          const user = response.user;
          const token = response.token;
          const userRule = this.authService.getUserRule(user);
          this.authService.setUserData(response, token);
          this.authService.gotoSpecificDashboard(userRule!);

        } else {
          console.error(response.message);

        }
      },
      (error) => {
        console.log('An error occurred. Please try again later.');
      }
    );
  }


}
