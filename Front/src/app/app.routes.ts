import {RouterModule, Routes} from '@angular/router';
import {MainViewComponent} from "./home-screen/main-view/main-view.component";
import {NgModule} from "@angular/core";
import {DashboardComponent} from "./dashboard/dashboard/dashboard.component";
import {CreateRequestComponent} from "./dashboard/student/create-request/create-request.component";
import {MainScreenComponent} from "./dashboard/student/main-screen/main-screen.component";

export const routes: Routes = [
  {
    path: '', component: MainViewComponent
  },
  // {path: 'dashboard', component: DashboardComponent},
  {path: 'student-main', component: MainScreenComponent},

  {path: 'student-request', component: CreateRequestComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}


