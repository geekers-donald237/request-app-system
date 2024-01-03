import {Component, OnInit} from '@angular/core';
import {StaffService} from "../../../services/staff/staff.service";
import {IStaffRequest} from "../../../models/staffrequest.model";
import {RequestStateConstants} from "../../../constant/constant";

@Component({
  selector: 'app-show-request',

  templateUrl: './show-request.component.html',
  styleUrl: './show-request.component.scss'
})
export class ShowRequestComponent implements OnInit {
  request: IStaffRequest | null = null;
  requestId = Number(localStorage.getItem('requestId'));

  constructor(
    private staffService: StaffService,
  ) {
  }

  ngOnInit(): void {
    this.getDetails(this.requestId);
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

  validateRequest() {
    this.updateRequestStatus(RequestStateConstants.ACCEPTEE);
  }

  putOnHoldRequest() {
    this.updateRequestStatus(RequestStateConstants.EN_COURS_DE_TRAITEMENT);
  }

  rejectRequest() {
    this.updateRequestStatus(RequestStateConstants.REFUSEE
    );
  }

  private updateRequestStatus(statut: string) {
    this.staffService.updateRequestStatus(this.requestId, statut)
      .subscribe(
        () => {
          console.log('status update')
        },
        error => {
          // Gérer l'échec, afficher un message d'erreur, etc.
          console.error(error);
        }
      );
  }


}
