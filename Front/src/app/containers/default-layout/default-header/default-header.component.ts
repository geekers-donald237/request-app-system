import {AuthService} from "../../../features/services/shared/auth/auth.service";
import {ClassToggleService, HeaderComponent} from "@coreui/angular";
import {Component, Input} from "@angular/core";

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent {

  @Input() sidebarId: string = "sidebar";


  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)

  constructor(private classToggler: ClassToggleService, private authService: AuthService) {
    super();
  }


  logout(): void {
    this.authService.logout().subscribe(
      () => {
        console.log('Déconnexion réussie');
        localStorage.clear();
      },
      (error) => {
        console.error('Erreur lors de la déconnexion : ', error);
      }
    );
  }
}
