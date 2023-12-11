import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/authentification.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  constructor(private authService: AuthService) {}

  // login(email: string, password: string): void {
  //   this.authService.auth(email, password).subscribe(
  //     (response: any) => {
  //       // Gérez la réponse de l'API après une connexion réussie
  //       console.log('Connexion réussie', response);
  //       // Redirigez l'utilisateur vers une autre page, etc.
  //     },
  //     (error: any) => {
  //       // Gérez les erreurs d'authentification
  //       console.error('Erreur de connexion', error);
  //     }
  //   );
  // }
}
