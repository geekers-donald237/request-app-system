import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {RequestStateConstants} from "../../../constant/constant";
import {IRequestPattern} from "../../../models/request.patterns.model";
import {RequestPatternService} from "../../../services/shared/request-pattern/request-pattern.service";
import {Utils} from "../../../services/shared/utils/utils";
import {IRequest} from "../../../models/request.model";
import {AppService} from "../../../services/app-services/app.service";

@Component({
  selector: 'app-list-request',
  templateUrl: './list-request.component.html',
  styleUrls: ['./list-request.component.scss']
})
export class ListRequestComponent implements OnInit {
  studentId: number = 1;
  pageIsLoad = true;
  color = "";
  visible = false;
  dismissible = true;
  message: string | undefined;
  requests: IRequest[] = [];
  utils: Utils;
  requestPatterns: IRequestPattern[] = [];


  constructor(private appService: AppService, private requestPatternService: RequestPatternService, private router: Router) {
    this.utils = new Utils(this.router);
  }

  ngOnInit(): void {
    this.loadData()
  }

  //  LOADING DATA
  loadData() {
    this.studentId = this.utils?.getUserIdFromLocalStorage();
    this.getRequestsFromStudent(this.studentId);
    this.fetchRequestPatterns();
  }


  // REQUEST INFORMATION AND STUDENT INFOS....
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

  // REQUEST OPERATIONS.....
  getRequestsFromStudent(studentId: number): void {
    this.appService.getRequestFromStudent(studentId).subscribe(
      (response) => {
        this.requests = response.requests;
      },
      (error) => {
        console.error('An error occurred. Please try again later.');
      }
    );
  }

  deleteRequest(requestId: number): void {
    this.appService.deleteRequest(requestId).subscribe(
      (response) => {
        if (response.isDeleted) {
          this.getRequestsFromStudent(this.studentId);
          this.showMessage('success', response.message)
        } else {
          this.showMessage('warning', response.message)
        }
      },
      (error) => {
        this.showMessage('danger', error.message)
      }
    );
  }

  // GO TO OTHER PAGE
  showRequest(requestId: number): void {
    localStorage.setItem('requestId', requestId.toString());
    this.router.navigate(['/app/show-request/:' + requestId]);
  }

  // SHOW MESSAGE IN ALERT
  showMessage(color: string, message: string): void {
    this.visible = true;
    this.color = color;
    this.message = message;
  }

  protected readonly RequestStateConstants = RequestStateConstants;
}
