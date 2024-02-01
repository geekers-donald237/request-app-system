import {Component, OnInit} from '@angular/core';
import {RequestService} from "../../../services/request/request.service";
import {IRequestHistory, IRequestHistoryResponse} from "../../../models/request.history.model";
import {Utils} from "../../../services/shared/utils/utils";
import {IUser} from "../../../models/staff.member.model";
import {RequestStateConstants} from "../../../constant/constant";

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
  usersInfo: { [key: number]: { email: string, name: string } } = {};



  constructor(private requestService: RequestService, private utils: Utils) {
  }

  ngOnInit(): void {
    this.requestId = Number(localStorage.getItem('requestId'));
    this.student = this.utils.getUserFromLocalStorage();

    this.requestService.getUsers().subscribe(response => {
      this.users = response.user;
      console.log(this.users);
    });

    this.requestService.getRequestHistory(this.requestId).subscribe(
      (response: IRequestHistoryResponse) => {
        this.historyResponse = response.history;
      },
      error => {
        console.error('Failed to fetch request history:', error);
      }
    );

    this.requestService.getUsers().subscribe(response => {
      this.users = response.user;
      console.log(this.users)
    });
  }

  protected readonly RequestStateConstants = RequestStateConstants;
}
