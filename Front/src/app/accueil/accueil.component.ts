import {Component} from '@angular/core';
import {InputTextModule} from "primeng/inputtext";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {CommonModule, NgIf} from "@angular/common";
import {ToastModule} from 'primeng/toast';
import {AuthService} from "../services/auth/auth.service";
import {MessageService} from "primeng/api";


@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [
    InputTextModule,
    ReactiveFormsModule,
    ButtonModule,
    CommonModule,
    ToastModule,
    NgIf,
  ],
  // providers: [MessageService],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.css',
  providers: [MessageService]

})


export class AccueilComponent {
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  })

  constructor(private fb: FormBuilder, private authService: AuthService, private messageService: MessageService) {
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
    this.showToast();
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

  showToast() {
    this.messageService.add({severity: 'success', summary: 'Heading', detail: 'More details....'});
  }

}

