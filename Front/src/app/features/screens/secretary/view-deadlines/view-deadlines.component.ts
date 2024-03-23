import {Component, OnInit} from '@angular/core';
import {Utils} from "../../../services/shared/utils/utils";
import {IUe} from "../../../models/ue.model";
import {BadgeStatus} from "../../../services/shared/utils/badge.status";
import {FormBuilder, Validators} from "@angular/forms";
import {AppService} from "../../../services/app-services/app.service";
import {DateUtils} from "../../../services/shared/utils/date";

@Component({
  selector: 'app-view-deadlines',
  templateUrl: './view-deadlines.component.html',
  styleUrls: ['./view-deadlines.component.scss']
})
export class ViewDeadlinesComponent implements OnInit {
  ues: IUe[] = [];
  selectedUe: IUe | undefined;
  date: DateUtils | undefined;
  badgeStatus: BadgeStatus;
  editForm = this.fb.group({
    newPublicationDate: ['', [Validators.required]],
    newSendingRequestInterval: ['', [Validators.required]]
  });
  // Propriétés pour la gestion de l'affichage d'alerte
  visible = false;
  dismissible = true;
  message: string | undefined;
  color = '';
  pageIsLoad = true;
  isLoading = false;

  constructor(private appService: AppService, private fb: FormBuilder, private utils: Utils) {
    this.badgeStatus = new BadgeStatus(this.date!);

  }

  get sendingRequestInterval() {
    return this.editForm.controls['newSendingRequestInterval'];
  }

  get publicationDate() {
    return this.editForm.controls['newPublicationDate'];
  }

  ngOnInit() {
    const secretaryId = this.utils.getUserIdFromLocalStorage();
    this.appService.getUesWithDeadlines(secretaryId).subscribe(
      (data) => {
        this.ues = data.ues;
      },
      (error) => {
        console.error('Erreur lors de la récupération des UEs avec délais :', error);
      }
    );
    setTimeout(() => {
      this.pageIsLoad = false;
    }, 2000);
  }


  onEditClick(ue: IUe) {
    this.selectedUe = ue;
  }

  updateDeadline() {
    this.isLoading = true;
    if (this.selectedUe) {
      const ueId = this.selectedUe.id;
      const updatedDeadlineData = {
        newPublicationDate: this.publicationDate.value,
        newSendingRequestInterval: this.sendingRequestInterval.value
      };

      this.appService.updateDeadline(ueId, updatedDeadlineData).subscribe(
        (response) => {
          this.showMessage(response.message, 'success');
          this.relaodPageAfterUpdated();
        },
        (error) => {
          this.showMessage(error.message, 'danger')
        }
      );
      setTimeout(() => {
        this.isLoading = false;

      }, 1000);
    }
  }

  // Afficher un message
  showMessage(message: string, color: string): void {
    this.message = message;
    this.visible = true;
    this.color = color;
  }

  // Rediriger après le succès de la sauvegarde
  private relaodPageAfterUpdated() {
    setTimeout(() => {
      location.reload();
    }, 2000);
  }

}

