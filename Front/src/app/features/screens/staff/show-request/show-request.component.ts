import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {RequestService} from '../../../services/request/request.service';
import {RequestStateConstants} from '../../../constant/constant';
import {IRequestPattern} from '../../../models/request.patterns.model';
import {IStudent, IStudentResponse} from "../../../models/student.model";
import {Utils} from "../../../services/shared/utils/utils";
import {RedirectLink} from "../../../services/shared/utils/redirect.link";
import {RequestPatternService} from "../../../services/shared/request-pattern/request-pattern.service";

@Component({
  selector: 'app-show-request',
  templateUrl: './show-request.component.html',
  styleUrls: ['./show-request.component.scss'],
})
export class ShowRequestComponent implements OnInit {
  request: any | undefined;
  userData: IStudent | undefined;
  requestPatterns: IRequestPattern[] = [];
  requestId: number = 0;
  utils: Utils;
  redirectLink: RedirectLink;
  showAlert: boolean = false;

  constructor(
    private router: Router,
    private requestService: RequestService
    , private requestPatternService: RequestPatternService
  ) {
    this.utils = new Utils(this.router);
    this.redirectLink = new RedirectLink()
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.requestId = Number(localStorage.getItem('requestId'));
    this.getRequestDetails();
    this.fetchRequestPatterns();
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
        console.log('An error occurred while fetching request details:', error);
      }
    );
  }

  private fetchRequestPatterns(): void {
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
        console.log('An error occurred while fetching student information:', error);
      }
    );
  }

  private updateRequestStatus(statut: string): void {
    this.requestService.updateRequestStatus(this.requestId, statut).subscribe(
      () => {
        console.log('Status update');
        setTimeout(() => {
          this.router.navigate(['/app/receive-request']);
        }, 3000);
      },
      (error) => {
        console.log('An error occurred while updating request status:', error);
      }
    );
  }


  // UPDATE REQUEST STATE AND DISPLAY ALERT
  showAlertWithTimeout(requestStatus: string): void {
    this.updateRequestStatus(requestStatus);
    this.showAlert = true;
    setTimeout(() => {
      this.closeAlert();
    }, 3000);
  }

  validateRequest(): void {
    this.showAlertWithTimeout(RequestStateConstants.ACCEPTED);
  }

  putOnHoldRequest(): void {
    this.showAlertWithTimeout(RequestStateConstants.EN_COURS_DE_TRAITEMENT);
  }

  rejectRequest(): void {
    this.showAlertWithTimeout(RequestStateConstants.REFUSED);
  }

  closeAlert() {
    this.showAlert = false;
  }

}
