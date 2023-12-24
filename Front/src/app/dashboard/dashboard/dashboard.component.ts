import { Component } from '@angular/core';
import {NavbarComponent} from "../dashboard-items/navbar/navbar.component";
import {SidebarComponent} from "../dashboard-items/sidebar/sidebar.component";
import {SettingSidebarComponent} from "../dashboard-items/setting-sidebar/setting-sidebar.component";
import {FooterComponent} from "../dashboard-items/footer/footer.component";
import {RouterOutlet} from "@angular/router";
import {MainScreenComponent} from "../student/main-screen/main-screen.component";
import {MainViewComponent} from "../../home-screen/main-view/main-view.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NavbarComponent,
    SidebarComponent,
    SettingSidebarComponent,
    FooterComponent,
    RouterOutlet,
    MainScreenComponent,
    MainViewComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
