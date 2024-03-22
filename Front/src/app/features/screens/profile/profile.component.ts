import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/shared/auth/auth.service";
import {Utils} from "../../services/shared/utils/utils";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  constructor(private authService: AuthService, private utils: Utils) {
  }

  user = this.utils.getUserFromLocalStorage();

  ngOnInit() {
    console.log(this.user);
  }

  deleteUserAccount() {
    this.authService.deleteUserAccount().subscribe(
      () => {
        console.log('Compte utilisateur supprimé avec succès');
      },
      (error) => {
        console.error('Erreur lors de la suppression du compte utilisateur', error);
      }
    );
  }

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
