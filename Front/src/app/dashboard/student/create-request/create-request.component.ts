import { Component } from '@angular/core';
import {FooterComponent} from "../../dashboard-items/footer/footer.component";
import {MainScreenComponent} from "../main-screen/main-screen.component";
import {NavbarComponent} from "../../dashboard-items/navbar/navbar.component";
import {RouterOutlet} from "@angular/router";
import {SettingSidebarComponent} from "../../dashboard-items/setting-sidebar/setting-sidebar.component";
import {SidebarComponent} from "../../dashboard-items/sidebar/sidebar.component";

@Component({
  selector: 'app-create-request',
  standalone: true,
    imports: [
        FooterComponent,
        MainScreenComponent,
        NavbarComponent,
        RouterOutlet,
        SettingSidebarComponent,
        SidebarComponent
    ],
  templateUrl: './create-request.component.html',
  styleUrl: './create-request.component.css'
})
export class CreateRequestComponent {

}
