import {Component, OnInit} from '@angular/core';
import {StaffService} from "../../../services/staff/staff.service";
import {RequestStateConstants} from "../../../constant/constant";
import {Router} from "@angular/router";
import {RequestService} from "../../../services/request/request.service";
import {IStudentData, IStudentResponse} from "../../../models/student.information.model";

@Component({
  selector: 'app-show-request',

  templateUrl: './show-request.component.html',
  styleUrl: './show-request.component.scss'
})
export class ShowRequestComponent implements OnInit {
  request: any = [];
  userData: IStudentData | undefined;
  requestPatterns: any[] = [];
  requestId = Number(localStorage.getItem('requestId'));

  constructor(
    private staffService: StaffService,
    private router: Router,
    private requestService: RequestService
  ) {
  }

  ngOnInit(): void {
    this.getDetails(this.requestId);
    this.requestService.getRequestPatterns().subscribe(
      (response) => {
        this.requestPatterns = response.patterns;
      },
      (error) => {
        console.error('Erreur lors de la récupération des motifs de requête:', error);
      }
    );
  }

  getDetails(requestId: number): void {
    this.staffService.getDetailsRequest(requestId).subscribe(
      (response) => {
        this.request = response.request;
        this.requestService.getStudentInformation(response.request.sender_id).subscribe(
          (response: IStudentResponse) => {
            this.userData = response.data;
          },
          error => {
            console.error('Une erreur s\'est produite :', error);
          }
        );
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

  getAttachmentUrl(filePath: string): string {
    const laravelBaseUrl = 'http://127.0.0.1:8000/storage';
    return `${laravelBaseUrl}/${filePath}`;
  }

  getAttachmentFileName(filePath: string): string {
    const parts = filePath.split('/');
    return parts[parts.length - 1];
  }

  getPatternDescriptionById(patternId: number): string {
    const pattern = this.requestPatterns.find((p) => p.id === patternId);
    return pattern ? pattern.pattern_description : 'Non défini';
  }

  private updateRequestStatus(statut: string) {
    this.staffService.updateRequestStatus(this.requestId, statut)
      .subscribe(
        () => {
          console.log('status update')
          this.router.navigate(['/app/request']);
        },
        error => {
          // Gérer l'échec, afficher un message d'erreur, etc.
          console.error(error);
        }
      );
  }
}
