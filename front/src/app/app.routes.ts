// app-routing.module.ts
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AccueilComponent } from './components/accueil/accueil.component';
import { AuthComponent } from './components/auth/auth.component';
import { ListeEtudiantComponent } from './components/etudiant/liste-etudiant/liste-etudiant.component';
export const routes: Routes = [
  {
    path: '',
    component:AccueilComponent,
  },
  {
    path: 'auth',
    component: AuthComponent,
  },
   {
    path:'liste_etudiant',
    component:ListeEtudiantComponent,
  },
  // {
  //   path: 'auth_enseignant',
  //   component: AuthEnseignantComponent,
  // },
  // {
  //   path:'dash_enseignant',
  //   component:DashEnseignantComponent
  // },
  // {
  //   path:'auth_admin',
  //   component:AuthAdminComponent
  // },
  // {
  //   path:'dash_admin',
  //   component:DashAdminComponent
  // }
  // // Ajoutez d'autres routes au besoin
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

