import {Component, OnInit} from '@angular/core';
import {IRequestHistory, IRequestHistoryResponse} from "../../../models/request.history.model";
import {Utils} from "../../../services/shared/utils/utils";
import {RequestStateConstants} from "../../../constant/constant";
import {IUser} from "../../../models/user.model";
import {AppService} from "../../../services/app-services/app.service";

@Component({
  selector: 'app-show-request-student',
  templateUrl: './show-request-student.component.html',
  styleUrl: './show-request-student.component.scss'
})
export class ShowRequestStudentComponent implements OnInit {
  historyResponse: IRequestHistory[] = [];
  requestId: number | undefined;
  student: any;
  users: IUser[] = [];
  pageIsLoad = true;

  constructor(private appService: AppService, private utils: Utils) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  // LOAD ALL DATA FOR STUDENT VIEW REQUEST HISTORY COMPONENT
  private loadData() {
    this.requestId = this.utils.loadRequestIdFromLocalStorage();
    this.loadUserFromLocalStorage();
    this.loadRequestHistory();
  }

  // LOAD USER FROM LOCALSTORAGE
  private loadUserFromLocalStorage(): void {
    this.student = this.utils.getUserFromLocalStorage();
  }


  // LOAD REQUEST HISTORY
  private loadRequestHistory(): void {
    this.appService.getRequestHistory(this.requestId!).subscribe(
      (response: IRequestHistoryResponse) => {
        this.historyResponse = response.history;
      },
      error => {
        console.error('Failed to fetch request history:', error);
      }
    );
    setTimeout(() => {
      this.pageIsLoad = false;
    }, 2000);
  }

  protected readonly RequestStateConstants = RequestStateConstants;

}
