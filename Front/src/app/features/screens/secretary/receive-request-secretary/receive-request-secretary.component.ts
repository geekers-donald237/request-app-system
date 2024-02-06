import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RequestService} from "../../../services/request/request.service";
import {Router} from "@angular/router";
import {Utils} from "../../../services/shared/utils/utils";
import {ButtonDirective} from "@coreui/angular";

@Component({
  selector: 'app-receive-request-secretary',
  standalone: true,
  imports: [CommonModule, ButtonDirective],
  templateUrl: './receive-request-secretary.component.html',
  styleUrl: './receive-request-secretary.component.scss'
})
export class ReceiveRequestSecretaryComponent implements OnInit {
  secretaryId: number | null = null;
  requests: IPersonnalRequest[] = [];

  constructor(private requestService: RequestService, private router: Router, private utils: Utils) {
  }

  ngOnInit(): void {
    this.secretaryId = this.utils.getUserIdFromLocalStorage();
    this.getAllSecretaryRequest(this.secretaryId);
  }

  getAllSecretaryRequest(secretaryId: number): void {
    this.requestService.getRequestReceiveBySecretary(secretaryId).subscribe(
      (response) => {
        this.requests = response.requests;
      },
      (error) => {
        console.log('An error occurred. Please try again later.');
      }
    );
  }

  showRequest(requestId: number): void {
    localStorage.setItem('requestId', requestId.toString());
    this.router.navigate(['/app/show-request-secretary']);
  }
}
