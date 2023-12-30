import {Component, OnInit} from '@angular/core';
import {StaffService} from "../../../services/staff/staff.service";
import {NgForOf} from "@angular/common";
import {FooterComponent} from "../../footer/footer.component";
import {ColorpanelComponent} from "../../colorpanel/colorpanel.component";
import {NavbarComponent} from "../../navbar/navbar.component";

@Component({
  selector: 'app-liste-requete2',
  standalone: true,
  imports: [
    NgForOf,
    FooterComponent,
    ColorpanelComponent,
    NavbarComponent
  ],
  templateUrl: './liste-requete2.component.html',
  styleUrl: './liste-requete2.component.css'
})
export class ListeRequete2Component implements OnInit {
  staffId: number | undefined;
  requests: any[] = [];

  staffRequests: any[] | undefined;

  constructor(private staffService: StaffService) {
  }

  ngOnInit(): void {
    const userDataString = localStorage.getItem('user');
    const userData = userDataString ? JSON.parse(userDataString) : null;
    this.staffId = userData ? parseInt(userData.id) : 0;


    this.staffService.getStaffRequests(this.staffId).subscribe(
      (response: { isLogged: any; user: any; token: any; message: any; requests:any }) => {
        this.requests = response.requests;

        console.log(this.requests);
      },
      (error: any) => {
        console.error('Erreur lors de la récupération des requêtes du personnel:', error);
      }
    );
  }
}
