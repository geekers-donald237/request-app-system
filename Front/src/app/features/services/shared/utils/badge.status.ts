import {DateUtils} from "./date";
import {RequestStateConstants} from "../../../constant/constant";

export class BadgeStatus {
  constructor(private date: DateUtils) {
  }

  getBadgeStatusClass(publicationDate: string, deadline: string): string {
    if (!publicationDate || !deadline) {
      return 'badge badge-warning';
    }

    const startDate = new Date(publicationDate);
    const endDate = new Date(deadline);

    if ((startDate > endDate)) {
      return 'badge badge-danger'; // Intervalle expiré
    } else {
      return 'badge badge-success'; // Intervalle en cours
    }

  }

  // Fonction pour obtenir le libellé du badge en fonction des dates
  getBadgeStatusLabel(publicationDate: string, deadline: string): string {
    if (!publicationDate || !deadline) {
      return RequestStateConstants.NON_DEFINI; // Statut "Non défini"
    }

    const startDate = new Date(publicationDate);
    const endDate = new Date(deadline);

    if (startDate > endDate) {
      return RequestStateConstants.TERMINEE; // Intervalle expiré
    } else {
      return RequestStateConstants.EN_COURS_DE_TRAITEMENT; // Intervalle en cours
    }
  }
}
