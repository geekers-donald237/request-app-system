import {Component} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AppService} from "../../../features/services/app-services/app.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  visible = false;
  isLoading = false;
  dismissible = true;
  errorMessage: string | undefined;

  signupForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    password_confirmation: ['', Validators.required],
    name: ['', Validators.required],
    matricule: ['', Validators.required],

  });

  constructor(
    private fb: FormBuilder,
    private appService: AppService,
    private router: Router
  ) {
  }

  get email() {
    return this.signupForm.controls['email'];
  }

  get name() {
    return this.signupForm.controls['name'];
  }

  get password() {
    return this.signupForm.controls['password'];
  }

  get cpassword() {
    return this.signupForm.controls['password_confirmation'];
  }

  get matricule() {
    return this.signupForm.controls['matricule'];
  }


  signup() {
    this.isLoading = true;
    const {name, email, password, matricule, password_confirmation} = this.signupForm.value
    this.appService.register(name!, email!, password!, matricule!, password_confirmation!).subscribe(
      (response) => {
        if (response.isRegistered) {
          this.router.navigate(['login']);
        } else {
          this.showErrorMessage(response.message);
        }
      },
      (error) => {
        this.showErrorMessage('An error occurred. Please try again later.');
      }
    );
    setTimeout(() => {
      this.isLoading = false;

    }, 1000);
  }


  // DISPLAY SOME ISSUE OR ERROR
  showErrorMessage(message: string): void {
    this.errorMessage = message;
    this.visible = true;
  }

}
