import {DateUtils} from "./date";
import {RequestStateConstants} from "../../../constant/constant";

export class BadgeStatus {
  constructor(private date: DateUtils) {
  }

  getStatusBadgeClass(publicationDate: string, deadline: string): string {
    const startDate = new Date(publicationDate);
    const endDate = new Date(deadline);

    if (!this.date.isRequestIntervalValid(startDate, endDate)) {
      return 'badge badge-danger'; // Intervalle expiré
    } else {
      return 'badge badge-success'; // Intervalle en cours
    }
  }

  // Fonction pour obtenir le libellé du badge en fonction des dates
  getStatusLabel(publicationDate: string, deadline: string): string {
    const startDate = new Date(publicationDate);
    const endDate = new Date(deadline);

    if (!this.date.isRequestIntervalValid(startDate, endDate)) {
      return RequestStateConstants.TERMINEE; // Intervalle expiré
    } else {
      return RequestStateConstants.EN_COURS_DE_TRAITEMENT; // Intervalle en cours
    }
  }
}
