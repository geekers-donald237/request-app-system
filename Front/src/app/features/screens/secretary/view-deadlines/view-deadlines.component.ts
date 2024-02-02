import {Component, OnInit} from '@angular/core';
import {RequestService} from "../../../services/request/request.service";
import {Utils} from "../../../services/shared/utils/utils";
import {IUe} from "../../../models/ue.model";
import {BadgeStatus} from "../../../services/shared/utils/badge.status";
import {DateUtils} from "../../../services/shared/utils/date";
import {FormBuilder, Validators} from "@angular/forms";
import {UeService} from "../../../services/ue/ue.service";

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

  constructor(private ueService: UeService, private fb: FormBuilder, private requestService: RequestService, private utils: Utils) {
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
    this.requestService.getUesWithDeadlines(secretaryId).subscribe(
      (data) => {
        this.ues = data.ues;
      },
      (error) => {
        console.error('Erreur lors de la récupération des UEs avec délais :', error);
      }
    );
  }


  onEditClick(ue: IUe) {
    this.selectedUe = ue;
  }

  updateDeadline() {
    if (this.selectedUe) {
      const ueId = this.selectedUe.id;
      const updatedDeadlineData = {
        newPublicationDate: this.publicationDate.value,
        newSendingRequestInterval: this.sendingRequestInterval.value
      };

      this.ueService.updateDeadline(ueId, updatedDeadlineData).subscribe(
        (response) => {
          console.log('Deadline mise à jour avec succès :', response);
          // location.reload();
        },
        (error) => {
          console.error('Erreur lors de la mise à jour de la deadline :', error);
          // Gérez les erreurs selon vos besoins
        }
      );
    }
  }

}

