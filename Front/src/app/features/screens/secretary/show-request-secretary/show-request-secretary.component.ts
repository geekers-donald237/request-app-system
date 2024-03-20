import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IRequestPattern} from '../../../models/request.patterns.model';
import {IStudent} from '../../../models/student.model';
import {RequestPatternService} from '../../../services/shared/request-pattern/request-pattern.service';
import {Utils} from '../../../services/shared/utils/utils';
import {RedirectLink} from '../../../services/shared/utils/redirect.link';
import {RequestDetailsService} from '../../../services/shared/request-details/request-details.service';
import {UpdateRequestStateService} from '../../../services/shared/update-request-state/update-request-state.service';
import {AlertComponent} from '@coreui/angular';
import {IUe} from '../../../models/ue.model';
import {Router} from '@angular/router';
import {IRequest} from "../../../models/request.model";

@Component({
  selector: 'app-show-request-secretary',
  standalone: true,
  imports: [CommonModule, AlertComponent],
  templateUrl: './show-request-secretary.component.html',
  styleUrl: './show-request-secretary.component.scss'
})
export class ShowRequestSecretaryComponent {
  request: any | undefined;
  userData: IStudent | undefined;
  isLoading1 = false;
  isLoading2 = false;

  requestPatterns: IRequestPattern[] = [];
  requestId: number | undefined;
  visible = false;

  dismissible = true;
  message: string | undefined;
  courses: IUe[] = [];
  color: string | undefined;
  utils: Utils | undefined;
  redirectLink: RedirectLink | undefined;
  pageIsLoad = true;


  constructor(
    private requestPatternService: RequestPatternService,
    private requestDetailsService: RequestDetailsService,
    private router: Router,
    private updateRequestStateService: UpdateRequestStateService
  ) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  // CHARGER LES DONNÉES
  loadData(): void {
    this.requestId = Number(localStorage.getItem('requestId'));
    this.getRequestDetails();
    this.getRequestPatterns();
  }

  // OBTENIR LES DÉTAILS DE LA DEMANDE
  getRequestDetails(): void {
    this.requestDetailsService.fetchRequestDetails();
    this.requestDetailsService.requestDetails$.subscribe(
      (requestDetails: IRequest) => {
        this.request = requestDetails;
        if (this.request?.sender_id) {
          this.loadStudentInformation(this.request.sender_id);
        }
      }
    );
  }

  // OBTENIR LES MOTIFS DE DEMANDE
  getRequestPatterns(): void {
    this.requestPatternService.fetchRequestPatterns();
    this.requestPatternService.requestPatterns$.subscribe((requestPatterns: IRequestPattern[]) => {
      this.requestPatterns = requestPatterns;
    });
    setTimeout(() => {
      this.pageIsLoad = false;
    }, 2000);
  }

  // CHARGER LES INFORMATIONS SUR L'ÉTUDIANT
  loadStudentInformation(senderId: number): void {
    this.requestDetailsService.loadStudentInformation(this.request.sender_id);
    this.requestDetailsService.studentInfo$.subscribe((studentInfo: IStudent) => {
      this.userData = studentInfo;
    });
  }

  // TRANSFÉRER LA DEMANDE
  transferringRequest(): void {
    this.isLoading1 = true;
    this.updateRequestStateService.transferringRequest().subscribe(
      (success) => {
        if (success) {
          this.handleDisplaySuccessMessage();
        } else {
          this.showMessage('Une erreur est survenue, veuillez réessayer', 'danger');
        }
      }
    );
    setTimeout(() => {
      this.isLoading1 = false;
    }, 1000);
  }

  // REJETER LA DEMANDE
  rejectRequest(): void {
    this.isLoading2 = true;
    this.updateRequestStateService.rejectRequest().subscribe(
      (success) => {
        if (success) {
          this.handleDisplaySuccessMessage();
        } else {
          this.showMessage('Une erreur est survenue, veuillez réessayer', 'danger');
        }
      }
    );
    setTimeout(() => {
      this.isLoading2 = false;
    }, 500);
  }

  // AFFICHER UN MESSAGE
  showMessage(message: string, color: string): void {
    this.message = message;
    this.visible = true;
    this.color = color;
  }

  // AFFICHER UN MESSAGE DE SUCCÈS AVEC UNE DURÉE
  handleDisplaySuccessMessage(): void {
    this.showMessage('Le traitement a été effectué avec succès', 'success');
    setTimeout(() => {
      this.router.navigate(['/app/secretary/requests']);
    }, 1000);
  }
}
