import {ClassToggleService, HeaderComponent} from "@coreui/angular";
import {Component, Input} from "@angular/core";
import {Router} from "@angular/router";
import {Utils} from "../../../features/services/shared/utils/utils";
import {AppService} from "../../../features/services/app-services/app.service";

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent {

  @Input() sidebarId: string = "sidebar";


  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)

  constructor(private classToggler: ClassToggleService, private appService: AppService, private router: Router, private utils: Utils) {
    super();
  }


  logout(): void {
    this.appService.logout().subscribe(
      () => {
        this.router.navigate(['']);
        this.utils.clearLocalStorage();
      },
      (error) => {
        console.error('Erreur lors de la déconnexion : ', error);
      }
    );
  }

  showLanguageAlert() {
    alert("En cours de developpement ");
  }

}
