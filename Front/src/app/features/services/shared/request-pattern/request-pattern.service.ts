// request-pattern.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {RequestService} from "../../request/request.service";

@Injectable({
  providedIn: 'root',
})
export class RequestPatternService {
  private requestPatternsSubject: BehaviorSubject<any> = new BehaviorSubject<any>({});
  public requestPatterns$: Observable<any> = this.requestPatternsSubject.asObservable();

  constructor(private requestService: RequestService) {}

  fetchRequestPatterns(): void {
    this.requestService.getRequestPatterns().subscribe(
      (response) => {
        this.requestPatternsSubject.next(response.patterns);
      },
      (error) => {
        console.error('Erreur lors de la récupération des motifs de requête:', error);
      }
    );
  }
}
