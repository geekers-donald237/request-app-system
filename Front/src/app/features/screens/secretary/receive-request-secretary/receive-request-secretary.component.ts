import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RequestService} from "../../../services/request/request.service";
import {Router} from "@angular/router";
import {Utils} from "../../../services/shared/utils/utils";
import {ButtonDirective} from "@coreui/angular";
import {IRequest} from "../../../models/request.model";
import {DateUtils} from "../../../services/shared/utils/date";

@Component({
  selector: 'app-receive-request-secretary',
  standalone: true,
  imports: [CommonModule, ButtonDirective, DateUtils],
  templateUrl: './receive-request-secretary.component.html',
  styleUrl: './receive-request-secretary.component.scss'
})
export class ReceiveRequestSecretaryComponent implements OnInit {
  secretaryId: number | null = null;
  requests: IRequest[] = [];

  constructor(private requestService: RequestService, private router: Router, private utils: Utils) {
  }

  ngOnInit(): void {
    this.fetchData();
  }

  // GETTING ALL DATA
  fetchData() {
    this.secretaryId = this.utils.getUserIdFromLocalStorage();
    this.getAllSecretaryRequest(this.secretaryId);
  }

  // GET SECRETARY REQUEST
  getAllSecretaryRequest(secretaryId: number): void {
    this.requestService.getRequestReceiveBySecretary(secretaryId).subscribe(
      (response) => {
        this.requests = response.requests
      },
      (error) => {
        console.log('An error occurred. Please try again later.');
      }
    );
  }

  showRequest(requestId: number): void {
    localStorage.setItem('requestId', requestId.toString());
    this.router.navigate(['/app/show-request-secretary/:' + requestId]);
  }
}
