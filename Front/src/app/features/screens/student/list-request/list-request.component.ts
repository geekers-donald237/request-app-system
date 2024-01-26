import {Component, OnInit} from '@angular/core';
import {RequestService} from "../../../services/request/request.service";
import {IRequest} from "../../../models/student.request.model";

@Component({
  selector: 'app-list-request',
  templateUrl: './list-request.component.html',
  styleUrls: ['./list-request.component.scss']
})
export class ListRequestComponent implements OnInit {
  studentId: number | null = null;
  visible = false;
  dismissible = true;
  errorMessage: string | undefined;
  successVisible = false;
  requests: IRequest[] = [];
  public liveDemoVisible = false;

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
        this.requests = response.requests;
        console.log(response.requests);
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

  deleteRequest(requestId: number): void {
    this.requestService.deleteRequest(requestId).subscribe(
      (response) => {
        if (response.isDeleted) {
          this.successVisible = true;
          // Actualiser la liste des requêtes après la suppression
          this.getAllStudentsRequest(this.studentId!);

        } else {
          this.errorMessage = response.message;
          this.visible = true;
        }
      },
      (error) => {
        console.error('Erreur lors de la suppression de la requête:', error);
      }
    );
  }


  protected readonly console = console;
}
