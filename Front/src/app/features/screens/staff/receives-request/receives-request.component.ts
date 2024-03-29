import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Utils} from "../../../services/shared/utils/utils";
import {RequestService} from "../../../services/request/request.service";
import {IRequest} from "../../../models/request.model";

@Component({
  selector: 'app-receives-request',
  templateUrl: './receives-request.component.html',
  styleUrl: './receives-request.component.scss'
})

export class ReceivesRequestComponent implements OnInit {
  staffId: number | undefined;
  requests: IRequest[] = [];
  pageIsLoad = true;

  constructor(private requestService: RequestService, private router: Router, private utils: Utils) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  // LOAD DATA INFORMATION
  private loadData() {
    this.staffId = this.utils.getUserIdFromLocalStorage();
    this.getAllStaffRequest(this.staffId);
  }

  // REQUEST OPERATIONS...
  getAllStaffRequest(staffId: number): void {
    this.requestService.getRequestReceiveByStaff(staffId).subscribe(
      (response) => {
        this.requests = response.requests;
      },
      (error) => {
        console.log('An error occurred. Please try again later.');
      }
    );

    setTimeout(() => {
      this.pageIsLoad = false;
    }, 2000);
  }

  showRequest(requestId: number): void {
    localStorage.setItem('requestId', requestId.toString());
    this.router.navigate(['app/staff/show-request/:id:' + requestId]);
  }

}
