import {Component, OnInit} from '@angular/core';
import {AppComponent} from "../../../../app.component";
import {StaffService} from "../../../services/staff/staff.service";
import {IStaffRequest} from "../../../models/staffrequest.model";

@Component({
  selector: 'app-receives-request',

  templateUrl: './receives-request.component.html',
  styleUrl: './receives-request.component.scss'
})
export class ReceivesRequestComponent implements OnInit {
  staffId: number | null = null;
  requests: IStaffRequest[] = [];


  constructor(private staffService: StaffService) {

  }

  ngOnInit(): void {
    this.staffId = AppComponent.getUserIdFromLocalStorage();

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
}
