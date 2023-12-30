// import {Routes} from '@angular/router';
// import {AccueilComponent} from './accueil/accueil.component';
// import {EnseignantComponent} from './components/admin/enseignant/enseignant.component';
// import {MainscreenComponent} from "./components/enseignant/mainscreen/mainscreen.component";
//
//
// export const routes: Routes = [
//
//
//   {path: '', redirectTo: 'home', pathMatch: 'full'}, //default route
//   {path: 'home', component: AccueilComponent},
//   // {
//   //   path: 'liste_requete', component: ListeRequeteComponent
//   // },
//   // {
//   //   path: 'requete_individuel', component: RequeteIndividuelComponent
//   // },
//   // {
//   //   path: 'requete_collective', component: RequeteCollectiveComponent
//   // },
//   // {
//   //   path: 'programme_etudiant', component: ProgrammeEtudiantComponent
//   // },
//   // {
//   //   path: 'voir_requete', component: VoirRequeteComponent
//   // },
//   // // enseignant
//   // {
//   //   path: 'enseignant', component: EnseignantComponent
//   // },
//   // {
//   //   path: 'list_individuel', component: ListIndividuelComponent
//   // },
//   // {
//   //   path: 'list_collective', component: ListCollectiveComponent
//   // },
//   // {
//   //   path: 'programme_enseignant', component: ProgrammeEnseignantComponent
//   // },
//   // {
//   //   path: 'traitement_collectif', component: TraitementIndividuelComponent
//   // },
//   // {
//   //   path: 'traitement_individuel', component: TraitementCollectifComponent
//   // },
//   // {
//   //   path: 'ajout_programme', component: AjoutProgrammeComponent
//   // },
//   // // admin
//   // {
//   //   path: 'liste_requete3', component: ListeRequete3Component
//   // },
//   // {
//   //   path: 'etudiant', component: EtudiantComponent
//   // },
//   // {
//   //   path: 'enseignant', component: EnseignantComponent
//   // },
//   // {
//   //   path: 'suivis', component: SuivisComponent
//   // },
//   // {
//   //   path: 'transfert_etudiant', component: TransfertEtudiantComponent
//   // },
//   // {
//   //   path: 'transfert_enseignant', component: TransfertEnseignantComponent
//   // },
//   // {
//   //   path: 'ajout_programmes', component: AjoutProgrammesComponent
//   // },
//   // {
//   //   path: 'programme_admin', component: ProgrammeAdminComponent
//   // },
//   // {
//   //   path: '', redirectTo: 'home', pathMatch: 'full'
//   // },
//
//   {
//     path: 'enseignant',
//     component: EnseignantComponent,
//     children: [
//       { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
//       { path: 'dashboard', component: MainscreenComponent },
//       // { path: 'list_individuel', component: ListIndividuelComponent },
//       // { path: 'list_collective', component: ListCollectiveComponent },
//       // {
//       //   path: 'calendrier',
//       //   component: CalendrierComponent,
//       //   children: [
//       //     { path: 'programme_enseignant', component: ProgrammeEnseignantComponent },
//       //     { path: 'ajout_programme', component: AjoutProgrammeComponent },
//       //   ],
//       // },
//     ],
//   },
//
//
// ];
//
//

import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AccueilComponent} from './accueil/accueil.component';
import {ListeRequete2Component} from "./components/enseignant/liste-requete2/liste-requete2.component";

export const routes: Routes = [
  { path: '', redirectTo: '/enseignant', pathMatch: 'full' }, // Redirection par défaut
  { path: 'home', component: AccueilComponent },
  { path: 'enseignant', component: ListeRequete2Component },
  { path: '**', redirectTo: '/home' }, // Redirection vers '/home' pour les routes non trouvées
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirection par défaut

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}


