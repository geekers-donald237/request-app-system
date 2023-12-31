import {Component, OnInit} from '@angular/core';
import {RequestService} from "../../../services/student/request.service";
import {IRequest} from "../../../models/request.model";

@Component({
  selector: 'app-list-request',
  templateUrl: './list-request.component.html',
  styleUrls: ['./list-request.component.scss']
})
export class ListRequestComponent implements OnInit {
  studentId: number | null = null;
  requests: IRequest[] = [];


  constructor(private requestService: RequestService) {

  }

  ngOnInit(): void {
    const userDataString = localStorage.getItem('user');
    const userData = userDataString ? JSON.parse(userDataString) : null;
    this.studentId = userData ? parseInt(userData.id) : 0;

    this.getAllStudentsRequest(this.studentId);
  }


  getAllStudentsRequest(studentId: number): void {
    this.requestService.getRequestFromStudent(studentId).subscribe(
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
