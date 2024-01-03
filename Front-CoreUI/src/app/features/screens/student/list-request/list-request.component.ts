import {Component, OnInit} from '@angular/core';
import {RequestService} from "../../../services/student/request.service";
import {IRequest} from "../../../models/studentrequest.model";

@Component({
  selector: 'app-list-request',
  templateUrl: './list-request.component.html',
  styleUrls: ['./list-request.component.scss']
})
export class ListRequestComponent implements OnInit {
  studentId: number | null = null;
  requests: IRequest[] = [];
  requestPatterns: any[] = [];



  constructor(private requestService: RequestService) {

  }

  ngOnInit(): void {
    const userDataString = localStorage.getItem('user');
    const userData = userDataString ? JSON.parse(userDataString) : null;
    this.studentId = userData ? parseInt(userData.id) : 0;

    this.getAllStudentsRequest(this.studentId);

    this.requestService.getRequestPatterns().subscribe(
      (response) => {
        this.requestPatterns = response.patterns;
      },
      (error) => {
        console.error('Erreur lors de la récupération des motifs de requête:', error);
      }
    );
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

  getPatternDescriptionById(patternId: number): string {
    const pattern = this.requestPatterns.find((p) => p.id === patternId);
    return pattern ? pattern.pattern_description : 'Non défini';
  }

}
