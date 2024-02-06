import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { RequestService } from '../../request/request.service';
import {IStudentResponse} from "../../../models/student.model";

@Injectable({
  providedIn: 'root'
})
export class RequestDetailsService {
  requestId: number;

  private requestDetailsSubject: BehaviorSubject<any> = new BehaviorSubject<any>({});
  public requestDetails$: Observable<any> = this.requestDetailsSubject.asObservable();

  private studentInfoSubject: BehaviorSubject<any> = new BehaviorSubject<any>({});
  public studentInfo$: Observable<any> = this.studentInfoSubject.asObservable();

  constructor(private requestService: RequestService) {
    this.requestId = Number(localStorage.getItem('requestId')) || 0;

  }

  fetchRequestDetails(): void {
    this.requestService.getDetailsRequest(this.requestId).subscribe(
      (response) => {
        this.requestDetailsSubject.next(response.request);
      },
      (error) => {
        console.error('Erreur lors de la récupération des détails de la demande:', error);
      }
    );
  }

  loadStudentInformation(senderId: number): void {
    this.requestService.getStudentInformation(senderId).subscribe(
      (response: IStudentResponse) => {
        this.studentInfoSubject.next(response.data);
      },
      (error) => {
        console.error('Une erreur s\'est produite lors de la récupération des informations sur l\'étudiant:', error);
      }
    );
  }
}
