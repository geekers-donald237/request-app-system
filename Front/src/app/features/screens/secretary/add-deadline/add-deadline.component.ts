import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {UeService} from "../../../services/ue/ue.service";
import {Utils} from "../../../services/shared/utils/utils";
import {CustomValidators} from "../../../services/shared/utils/invalid.controls";
import {Router} from "@angular/router";
import {IAddDeadlineResponse} from "../../../models/add.deadline.model";

@Component({
  selector: 'app-add-deadline',
  templateUrl: './add-deadline.component.html',
  styleUrls: ['./add-deadline.component.scss']
})
export class AddDeadlineComponent implements OnInit {
  // Propriétés pour la gestion de l'affichage d'alerte
  visible = false;
  dismissible = true;
  errorMessage: string | undefined;
  color = '';

  // Formulaire de création de deadline
  addDeadlineForm = this.fb.group({
    levelId: ['', Validators.required],
    sendingRequestInterval: ['', Validators.required],
    publicationDateS1: ['', Validators.required],
    publicationDateS2: ['', [Validators.required, CustomValidators.dateRange]],
  });

  // Options de niveaux
  levels: { id: number; name: string }[] = [
    {id: 1, name: 'Licence 1'},
    {id: 2, name: 'Licence 2'},
    {id: 3, name: 'Licence 3'},
    {id: 4, name: 'Master 1'},
    {id: 5, name: 'Master 2'},
    {id: 6, name: 'Doctorat 1'},
    {id: 7, name: 'Doctorat 2'},
    {id: 8, name: 'Plus....'},
  ];

  constructor(private fb: FormBuilder, private router: Router, private ueService: UeService, private utils: Utils) {
  }

  ngOnInit() {
  }

  // Accès aux contrôles du formulaire pour les validations dans le template
  get levelId() {
    return this.addDeadlineForm.controls['levelId'];
  }

  get sendingRequestInterval() {
    return this.addDeadlineForm.controls['sendingRequestInterval'];
  }

  get publicationDateS1() {
    return this.addDeadlineForm.controls['publicationDateS1'];
  }

  get publicationDateS2() {
    return this.addDeadlineForm.controls['publicationDateS2'];
  }

  saveDeadline() {
    const userId = this.utils.getUserIdFromLocalStorage();
    const formData = this.addDeadlineForm.value;

    this.ueService.createDeadline(userId, formData).subscribe(
      (response) => {
        // Traitement de la réponse
        this.handleSaveResponse(response);
      },
      (error) => {
        // Gestion des erreurs
        this.handleSaveError();
      }
    );
  }

  private handleSaveResponse(response: IAddDeadlineResponse) {
    if (response.isSaved) {
      this.handleSuccess(response.message);
      this.navigateAfterSuccess();
    } else {
      this.handleError(response.message);
    }
  }

  private handleSuccess(message: string) {
    this.errorMessage = message;
    this.color = "success";
    this.visible = true;
  }

  private handleError(message: string) {
    console.log(message);
    this.errorMessage = message;
    this.color = "danger";
    this.visible = true;
  }

  private handleSaveError() {
    this.errorMessage = "An error occurred. Please try again later.";
    this.color = "danger";
    this.visible = true;
  }

  private navigateAfterSuccess() {
    setTimeout(() => {
      this.router.navigate(['app/show-program']);
    }, 2000);
  }
}
