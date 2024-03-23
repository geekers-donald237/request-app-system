import {Component, OnInit} from '@angular/core';
import {Utils} from "../../services/shared/utils/utils";
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {IUser} from "../../models/user.model";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AppService} from "../../services/app-services/app.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  isLoading1 = false;
  visible = false;
  dismissible = true;
  color = '';
  message: string | undefined;
  user: IUser | null = null;
  userInfoFormData = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    name: ['', Validators.required],
  });
  userPasswordFormData = this.fb.group({
    password: ['', Validators.required],
    cPassword: ['', Validators.required],
  });

  constructor(private appService: AppService, private utils: Utils, private fb: FormBuilder, private router: Router, private modalService: NgbModal) {
  }

  ngOnInit() {
    this.user = this.utils.getUserFromLocalStorage();
    if (this.user) {
      this.userInfoFormData.patchValue({
        name: this.user.name,
        email: this.user.email
      });
    }
  }


  updateUserProfile() {
    if (!this.userInfoFormData.valid) return;
    this.modalService.dismissAll();

    this.isLoading1 = true;
    const formData = this.createFormData();
    this.appService.updateUserProfile(formData).subscribe(
      () => {
        this.showMessage("Profil mis à jour avec succès", 'success');
        setTimeout(() => {
          this.router.navigate(['']);
          this.utils.clearLocalStorage();
        }, 1000);
      },
      (error) => {
        console.error('Erreur lors de la mise à jour du profil', error);
        this.isLoading1 = false;
        this.showMessage("Une erreur s'est produite. Veuillez réessayer plus tard.", 'danger');
      }
    );
  }

  updateUserPassword() {
    if (!this.userPasswordFormData.valid) return;

    const formData = this.createuserFormData();
    this.appService.updateUserPassword(formData).subscribe(
      () => {
        this.showMessage("Mot de passe mis à jour avec succès", 'success');
        setTimeout(() => {
          this.router.navigate(['']);
          this.utils.clearLocalStorage();
        }, 1000);
      },
      (error) => {
        console.error('Erreur lors de la mise à jour du mot de passe', error);
        this.showMessage("Une erreur s'est produite. Veuillez réessayer plus tard.", 'danger');
      }
    );
  }


  deleteUserAccount() {
    this.appService.deleteUserAccount().subscribe(
      () => {
        this.router.navigateByUrl('');
        setTimeout(() => {
          this.utils.clearLocalStorage();
          window.location.reload();
        }, 1000);
      },
      (error) => {
        console.error('Erreur lors de la suppression du compte utilisateur', error);

      }
    );
  }

  private createFormData(): FormData {
    const formData = new FormData();
    Object.entries(this.userInfoFormData.value)
      .forEach(([key, value]) => formData.append(key, value !== null ? value : ''));
    return formData;
  }

  private createuserFormData(): FormData {
    const formData = new FormData();
    Object.entries(this.userPasswordFormData.value)
      .forEach(([key, value]) => formData.append(key, value !== null ? value : ''));
    return formData;
  }


  get name() {
    return this.userInfoFormData.controls['name'];
  }

  get email() {
    return this.userInfoFormData.controls['email'];
  }

  get password() {
    return this.userPasswordFormData.controls['password'];
  }

  get cPassword() {
    return this.userPasswordFormData.controls['cPassword'];
  }

  confirmDeleteUserAccount() {
    const confirmation = window.confirm("Are you sure you want to delete your account?");
    if (confirmation) {
      this.deleteUserAccount();
    }
  }

  showMessage(message: string, color: string): void {
    this.message = message;
    this.visible = true;
    this.color = color;
  }


}

