import { Component } from '@angular/core';
import {HeaderComponent} from "../header/header.component";
import {ContentComponent} from "../content/content.component";
import {FooterComponent} from "../footer/footer.component";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-main-view',
  standalone: true,
  imports: [
    HeaderComponent,
    ContentComponent,
    FooterComponent,
    RouterOutlet
  ],
  templateUrl: './main-view.component.html',
  styleUrl: './main-view.component.css'
})
export class MainViewComponent {

}
