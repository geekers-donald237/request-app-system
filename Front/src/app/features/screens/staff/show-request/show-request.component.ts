import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {RequestStateConstants} from '../../../constant/constant';
import {IRequestPattern} from '../../../models/request.patterns.model';
import {IStudent, IStudentResponse} from "../../../models/student.model";
import {Utils} from "../../../services/shared/utils/utils";
import {RedirectLink} from "../../../services/shared/utils/redirect.link";
import {RequestPatternService} from "../../../services/shared/request-pattern/request-pattern.service";
import {AppService} from "../../../services/app-services/app.service";

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

  isLoading1 = false;
  isLoading2 = false;
  isLoading3 = false;

  utils: Utils;
  visible = false;

  dismissible = true;
  message: string | undefined;
  color: string | undefined;
  redirectLink: RedirectLink;
  showAlert: boolean = false;
  pageIsLoad = true;

  constructor(
    private router: Router,
    private appService: AppService
    , private requestPatternService: RequestPatternService
  ) {
    this.utils = new Utils(this.router);
    this.redirectLink = new RedirectLink()
  }

  showMessage(message: string, color: string): void {

    setTimeout(() => {
      this.isLoading1 = false;
      this.isLoading2 = false;
      this.isLoading3 = false;
    }, 1000);

    this.message = message;
    this.visible = true;
    this.color = color;

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
    this.appService.getDetailsRequest(this.requestId).subscribe(
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
    setTimeout(() => {
      this.pageIsLoad = false;
    }, 2000);
  }

  loadStudentInformation(senderId: number): void {
    this.appService.getStudentInformation(senderId).subscribe(
      (response: IStudentResponse) => {
        this.userData = response.data;
      },
      (error) => {
        console.log('An error occurred while fetching student information:', error);
      }
    );
  }

  private updateRequestStatus(statut: string): void {
    this.appService.updateRequestStatus(this.requestId, statut).subscribe(
      () => {
        this.router.navigate(['/app/receive-request']);
      },
      (error) => {
        this.showMessage('An error occurred while updating request status:', error);
      }
    );

  }


  // UPDATE REQUEST STATE AND DISPLAY ALERT
  showAlertWithTimeout(requestStatus: string): void {
    this.updateRequestStatus(requestStatus);
    this.showMessage('Le traitement a été effectué avec succès', 'success');
  }

  validateRequest(): void {
    this.isLoading1 = true;
    this.showAlertWithTimeout(RequestStateConstants.ACCEPTED);

  }

  putOnHoldRequest(): void {
    this.isLoading2 = true;
    this.showAlertWithTimeout(RequestStateConstants.EN_COURS_DE_TRAITEMENT);
  }

  rejectRequest(): void {
    this.isLoading3 = true;
    this.showAlertWithTimeout(RequestStateConstants.REFUSED);
  }


}
