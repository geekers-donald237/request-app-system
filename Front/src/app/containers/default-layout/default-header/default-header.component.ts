import {AuthService} from "../../../features/services/shared/auth/auth.service";
import {ClassToggleService, HeaderComponent} from "@coreui/angular";
import {Component, Input} from "@angular/core";
import {Router} from "@angular/router";
import {Utils} from "../../../features/services/shared/utils/utils";

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent {

  @Input() sidebarId: string = "sidebar";


  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)

  constructor(private classToggler: ClassToggleService, private authService: AuthService, private router: Router, private utils: Utils) {
    super();
  }


  logout(): void {
    this.authService.logout().subscribe(
      () => {
        this.router.navigate(['']);
        this.utils.clearLocalStorage();
      },
      (error) => {
        console.error('Erreur lors de la déconnexion : ', error);
      }
    );
  }
}
