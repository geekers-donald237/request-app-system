import {Component, OnInit} from '@angular/core';
import {RequestService} from "../../../services/request/request.service";
import {IUeWithDeadline} from "../../../models/get.ue.with.deadline.model";
import {Utils} from "../../../services/shared/utils/utils";

@Component({
  selector: 'app-view-deadlines',
  templateUrl: './view-deadlines.component.html',
  styleUrls: ['./view-deadlines.component.scss']
})
export class ViewDeadlinesComponent implements OnInit {
  ues: IUeWithDeadline[] = [];

  constructor(private requestService: RequestService , private utils:Utils) {
  }

  ngOnInit() {
    const secretaryId = this.utils.getUserIdFromLocalStorage();
    this.requestService.getUesWithDeadlines(secretaryId).subscribe(
      (data) => {
        console.log(data.ues)
        this.ues = data.ues;
      },
      (error) => {
        console.error('Erreur lors de la récupération des UEs avec délais :', error);
      }
    );
  }




  getStatusBadgeClass(publicationDate: string, deadline: string): string {
    const startDate = new Date(publicationDate);
    const endDate = new Date(deadline);

    if (!this.isRequestIntervalValid(startDate, endDate)) {
      return 'badge badge-danger'; // Intervalle expiré
    } else {
      return 'badge badge-success'; // Intervalle en cours
    }
  }

  // Fonction pour obtenir le libellé du badge en fonction des dates
  getStatusLabel(publicationDate: string, deadline: string): string {
    const startDate = new Date(publicationDate);
    const endDate = new Date(deadline);

    if (!this.isRequestIntervalValid(startDate, endDate)) {
      return 'Terminé'; // Intervalle expiré
    } else {
      return 'En cours'; // Intervalle en cours
    }
  }

  isRequestIntervalValid(startDate: Date, endDate: Date): boolean {
    const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
    return timeDiff >= 0;
  }

}
