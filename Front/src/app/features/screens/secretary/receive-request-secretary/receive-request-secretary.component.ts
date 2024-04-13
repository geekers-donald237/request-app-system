import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router} from "@angular/router";
import {Utils} from "../../../services/shared/utils/utils";
import {ButtonDirective} from "@coreui/angular";
import {IRequest} from "../../../models/request.model";
import {AppService} from "../../../services/app-services/app.service";

@Component({
  selector: 'app-receive-request-secretary',
  standalone: true,
  imports: [CommonModule, ButtonDirective],
  templateUrl: './receive-request-secretary.component.html',
  styleUrl: './receive-request-secretary.component.scss'
})
export class ReceiveRequestSecretaryComponent implements OnInit {
  secretaryId: number | null = null;
    requests: IRequest[] = [];
  pageIsLoad = true;


  constructor(private appService: AppService, private router: Router, private utils: Utils) {
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
    this.appService.getRequestReceiveBySecretary(secretaryId).subscribe(
      (response) => {
        this.requests = response.requests
      },
      (error) => {
        console.log('An error occurred. Please try again later.');
      }
    );
    setTimeout(() => {
      this.pageIsLoad = false;
    }, 2000);
  }

  showRequest(requestId: number): void {
    localStorage.setItem('requestId', requestId.toString());
    this.router.navigate(['/app/show-request-secretary/:' + requestId]);
  }
}
