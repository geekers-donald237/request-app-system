import {Component, OnInit} from '@angular/core';
import {StaffService} from "../../../services/staff/staff.service";
import {IStaffRequest} from "../../../models/staffrequest.model";

@Component({
  selector: 'app-show-request',

  templateUrl: './show-request.component.html',
  styleUrl: './show-request.component.scss'
})
export class ShowRequestComponent implements OnInit {
  request: IStaffRequest | null = null;
  constructor(
    private staffService: StaffService,
  ) {
  }

  ngOnInit(): void {
    const requestId = Number(localStorage.getItem('requestId'));
    this.getDetails(requestId);
  }

  getDetails(requestId: number): void {
    this.staffService.getDetailsRequest(requestId).subscribe(
      (response) => {
        this.request = response;
        console.log(this.request);
      },
      (error) => {
        console.log('An error occurred. Please try again later.');
      }
    );
  }




  validerRequest(): void {
    // Logique pour valider la requête
  }

  rejeterRequest(): void {
    // Logique pour rejeter la requête
  }

  mettreEnAttenteRequest(): void {
    // Logique pour mettre en attente la requête
  }

  getAttachmentUrl(filePath: string): string {
    // Logique pour construire l'URL complète de la pièce jointe
    return `URL_BASE/${filePath}`;
  }

  getAttachmentName(filePath: string): string {
    // Logique pour extraire le nom de la pièce jointe à partir du chemin
    const parts = filePath.split('/');
    return parts[parts.length - 1];
  }

}
