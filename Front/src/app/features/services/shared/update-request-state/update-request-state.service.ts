import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { RequestStateConstants } from '../../../constant/constant';
import { RequestService } from '../../request/request.service';

@Injectable({
  providedIn: 'root'
})
export class UpdateRequestStateService {
  private requestId: number | undefined;
  private updateStatusSubject: Subject<boolean> = new Subject<boolean>();

  constructor(private requestService: RequestService) {
    this.requestId = Number(localStorage.getItem('requestId'));
  }

  transferringRequest(): Observable<boolean> {
    return this.updateRequestStatus(RequestStateConstants.EN_COURS_DE_TRAITEMENT);
  }

  rejectRequest(): Observable<boolean> {
    return this.updateRequestStatus(RequestStateConstants.REFUSED);
  }

  private updateRequestStatus(statut: string): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.requestService.updateRequestStatus(this.requestId ?? 0, statut).subscribe(
        () => {
          observer.next(true);
          observer.complete();
        },
        (error) => {
          observer.next(false);
          observer.complete();
        }
      );
    });
  }

  getUpdateStatusObservable(): Observable<boolean> {
    return this.updateStatusSubject.asObservable();
  }
}
