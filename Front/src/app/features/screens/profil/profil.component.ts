import { Component } from '@angular/core';
import {AuthService} from "../../services/shared/auth/auth.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  constructor(private authService: AuthService) {}

  // updateUserProfile() {
  //   // Appeler la méthode updateUserProfile du service AuthService avec les données du profil
  //   this.authService.updateUserProfile(profileData).subscribe(
  //     (response) => {
  //       console.log('Profil mis à jour avec succès', response);
  //       // Gérer la réponse
  //     },
  //     (error) => {
  //       console.error('Erreur lors de la mise à jour du profil', error);
  //       // Gérer l'erreur
  //     }
  //   );
  // }
  //
  // deleteUserAccount() {
  //   // Appeler la méthode deleteUserAccount du service AuthService pour supprimer le compte utilisateur
  //   this.authService.deleteUserAccount().subscribe(
  //     () => {
  //       console.log('Compte utilisateur supprimé avec succès');
  //       // Rediriger ou afficher un message de confirmation
  //     },
  //     (error) => {
  //       console.error('Erreur lors de la suppression du compte utilisateur', error);
  //       // Gérer l'erreur
  //     }
  //   );
  // }
  //
  // updateUserPassword() {
  //   this.authService.updateUserPassword(passwordData).subscribe(
  //     () => {
  //       console.log('Mot de passe utilisateur mis à jour avec succès');
  //     },
  //     (error) => {
  //       console.error('Erreur lors de la mise à jour du mot de passe utilisateur', error);
  //     }
  //   );
  // }
}
