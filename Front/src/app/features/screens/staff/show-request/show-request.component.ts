import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {RequestService} from '../../../services/request/request.service';
import {StaffService} from '../../../services/staff/staff.service';
import {RequestStateConstants} from '../../../constant/constant';
import {IStudentData, IStudentResponse} from '../../../models/student.information.model';
import {IRequestPattern} from '../../../models/request.patterns.model';

@Component({
  selector: 'app-show-request',
  templateUrl: './show-request.component.html',
  styleUrls: ['./show-request.component.scss'],
})
export class ShowRequestComponent implements OnInit {
  request: any | undefined;
  userData: IStudentData | undefined;
  requestPatterns: IRequestPattern[] = [];
  requestId: number;
  afficherAlerte: boolean = false;

  constructor(
    private staffService: StaffService,
    private router: Router,
    private requestService: RequestService
  ) {
    this.requestId = Number(localStorage.getItem('requestId')) || 0;
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.getRequestDetails();
    this.getRequestPatterns();
  }

  getRequestDetails(): void {
    this.requestService.getDetailsRequest(this.requestId).subscribe(
      (response) => {
        console.log(response);
        this.request = response.request;
        if (this.request?.sender_id) {
          this.loadStudentInformation(this.request.sender_id);
        }
      },
      (error) => {
        this.handleError('An error occurred while fetching request details:', error);
      }
    );
  }

  getRequestPatterns(): void {
    this.requestService.getRequestPatterns().subscribe(
      (response) => {
        this.requestPatterns = response.patterns;
      },
      (error) => {
        this.handleError('Error retrieving request patterns:', error);
      }
    );
  }

  loadStudentInformation(senderId: number): void {
    this.requestService.getStudentInformation(senderId).subscribe(
      (response: IStudentResponse) => {
        this.userData = response.data;
      },
      (error) => {
        this.handleError('An error occurred while fetching student information:', error);
      }
    );
  }

  validateRequest(): void {
    this.updateRequestStatus(RequestStateConstants.ACCEPTEE);
    this.afficherAlerte = true;
    setTimeout(() => {
      this.fermerAlerte();
    }, 3000);
  }
  putOnHoldRequest(): void {
    this.updateRequestStatus(RequestStateConstants.EN_COURS_DE_TRAITEMENT);
    this.afficherAlerte = true;
    setTimeout(() => {
      this.fermerAlerte();
    }, 3000);
  }

  rejectRequest(): void {
    this.updateRequestStatus(RequestStateConstants.REFUSEE);
    this.afficherAlerte = true;
    setTimeout(() => {
      this.fermerAlerte();
    }, 3000);
  }
  fermerAlerte() {
    this.afficherAlerte = false;
  }
  getAttachmentUrl(filePath: string): string {
    const laravelBaseUrl = 'http://127.0.0.1:8000/storage';
    return `${laravelBaseUrl}/${filePath}`;
  }

  getPatternDescriptionById(patternId: number | undefined): string {
    const pattern = this.requestPatterns.find((p) => p.id === patternId);
    return pattern ? pattern.pattern_description : 'Non défini';
  }

  private updateRequestStatus(statut: string): void {
    this.requestService.updateRequestStatus(this.requestId, statut).subscribe(
      () => {
        console.log('Status update');
        setTimeout(() => {
        this.router.navigate(['/app/receive-request']);
        },3000);
      },
      (error) => {
        this.handleError('An error occurred while updating request status:', error);
      }
    );
  }

  private handleError(message: string, error: any): void {
    console.error(`${message} ${error}`);
    // Ajoutez ici la logique pour gérer les erreurs (par exemple, afficher un message à l'utilisateur)
  }
}
