import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterLink} from "@angular/router";
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../../services/shared/auth/auth.service";
import {ISubscribeNewsletterModel} from "../../../models/subscribe.newsletter.model";

@Component({
  selector: 'app-acceuil',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './acceuil.component.html',
  styleUrl: './acceuil.component.scss'
})
export class AcceuilComponent implements OnInit {
  newsletterForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });

  constructor(private fb: FormBuilder, private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  get email() {
    return this.newsletterForm.controls['email'];
  }

  subscribeToNewsletter(): void {
    if (this.newsletterForm.valid) {
      const email = this.email.value;
      this.authService.subscribeToNewsletter(email).subscribe(
        (response: ISubscribeNewsletterModel) => {
          if (response.status == 200) {
            console.log('Inscription à la newsletter réussie !', 'success');
            location.reload();
          }
        },
        () => {
          console.log('Une erreur est survenue. Veuillez réessayer plus tard.', 'danger');
        }
      );
    } else {
      console.log('Veuillez fournir une adresse email valide.', 'warning');
    }
  }


}
