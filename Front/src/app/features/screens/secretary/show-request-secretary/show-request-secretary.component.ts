import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IRequestPattern} from "../../../models/request.patterns.model";
import {Router} from "@angular/router";
import {RequestService} from "../../../services/request/request.service";
import {RequestStateConstants} from "../../../constant/constant";
import {IStudent, IStudentResponse} from "../../../models/student.model";
import {RequestPatternService} from "../../../services/shared/request-pattern/request-pattern.service";

@Component({
  selector: 'app-show-request-secretary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './show-request-secretary.component.html',
  styleUrl: './show-request-secretary.component.scss'
})
export class ShowRequestSecretaryComponent {
  request: any | undefined;
  userData: IStudent | undefined;
  requestPatterns: IRequestPattern[] = [];
  requestId: number;
  visible: boolean = false;

  constructor(
    private router: Router,
    private requestService: RequestService,
    private requestPatternService: RequestPatternService
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
        this.request = response.requests;
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
    this.requestPatternService.fetchRequestPatterns();
    this.requestPatternService.requestPatterns$.subscribe((requestPatterns: IRequestPattern[]) => {
        this.requestPatterns = requestPatterns;
      },
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


  transferringRequest(): void {
    this.updateRequestStatus(RequestStateConstants.EN_COURS_DE_TRAITEMENT);
  }

  rejectRequest(): void {
    this.updateRequestStatus(RequestStateConstants.REFUSED);

  }

  fermerAlerte() {
    this.visible = false;
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
        this.visible = true;
        setTimeout(() => {
          this.fermerAlerte();
          this.router.navigate(['/app/secretary/requests']);
        }, 3000);

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
