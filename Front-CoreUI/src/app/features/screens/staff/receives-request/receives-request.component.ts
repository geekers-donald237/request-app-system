import {Component, OnInit} from '@angular/core';
import {AppComponent} from "../../../../app.component";
import {StaffService} from "../../../services/staff/staff.service";
import {IStaffRequest} from "../../../models/staff.request.model";
import {Router} from "@angular/router";
import {Utils} from "../../../services/shared/utils/utils";

@Component({
  selector: 'app-receives-request',

  templateUrl: './receives-request.component.html',
  styleUrl: './receives-request.component.scss'
})
export class ReceivesRequestComponent implements OnInit {
  staffId: number | null = null;
  requests: IStaffRequest[] = [];


  constructor(private staffService: StaffService , private router:Router ,private utils: Utils) {
  }

  ngOnInit(): void {
    this.staffId = this.utils.getUserIdFromLocalStorage();
    this.getAllStaffRequest(this.staffId);
  }

  getAllStaffRequest(staffId: number): void {
    this.staffService.getRequestFromStudent(staffId).subscribe(
      (response) => {
        console.log(response);
        this.requests = response.requests;
      },
      (error) => {
        console.log('An error occurred. Please try again later.');
      }
    );
  }

  showRequest(requestId: number): void {
    localStorage.setItem('requestId', requestId.toString());
    this.router.navigate(['/app/show-request']);
  }
}
