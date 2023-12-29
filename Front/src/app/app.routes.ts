import { Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { RequeteIndividuelComponent } from './components/etudiant/requete-individuel/requete-individuel.component';
import { RequeteCollectiveComponent } from './components/etudiant/requete-collective/requete-collective.component';
import { ProgrammeEtudiantComponent } from './components/etudiant/programme-etudiant/programme-etudiant.component';
import { VoirRequeteComponent } from './components/etudiant/voir-requete/voir-requete.component';
import { ListeRequeteComponent } from './components/etudiant/liste-requete/liste-requete.component';
import { ListeRequete2Component } from './components/enseignant/liste-requete2/liste-requete2.component';
import { ListIndividuelComponent } from './components/enseignant/list-individuel/list-individuel.component';
import { ListCollectiveComponent } from './components/enseignant/list-collective/list-collective.component';
import { ProgrammeEnseignantComponent } from './components/enseignant/programme-enseignant/programme-enseignant.component';
import { TraitementIndividuelComponent } from './components/enseignant/traitement-individuel/traitement-individuel.component';
import { TraitementCollectifComponent } from './components/enseignant/traitement-collectif/traitement-collectif.component';
import { AjoutProgrammeComponent } from './components/enseignant/ajout-programme/ajout-programme.component';
import { ListeRequete3Component } from './components/admin/liste-requete3/liste-requete3.component';
import { EtudiantComponent } from './components/admin/etudiant/etudiant.component';
import { EnseignantComponent } from './components/admin/enseignant/enseignant.component';
import { SuivisComponent } from './components/admin/suivis/suivis.component';
import { TransfertEtudiantComponent } from './components/admin/transfert-etudiant/transfert-etudiant.component';
import { TransfertEnseignantComponent } from './components/admin/transfert-enseignant/transfert-enseignant.component';
import { AjoutProgrammesComponent } from './components/admin/ajout-programmes/ajout-programmes.component';
import { ProgrammeAdminComponent } from './components/admin/programme-admin/programme-admin.component';

export const routes: Routes = [
    {
      path: '', component:AccueilComponent
    },
    {
      path: 'liste_requete', component:ListeRequeteComponent
    },
    {
      path: 'requete_individuel', component:RequeteIndividuelComponent
    },
    {
      path: 'requete_collective', component:RequeteCollectiveComponent
    },
    {
      path: 'programme_etudiant', component:ProgrammeEtudiantComponent
    },
    {
      path: 'voir_requete', component:VoirRequeteComponent
    },
    // enseignant
    {
      path: 'liste_requete2', component:ListeRequete2Component
    },
    {
      path: 'list_individuel', component:ListIndividuelComponent
    },
    {
      path: 'list_collective', component:ListCollectiveComponent
    },
    {
      path: 'programme_enseignant', component:ProgrammeEnseignantComponent
    },
    {
      path: 'traitement_collectif', component:TraitementIndividuelComponent
    },
    {
      path: 'traitement_individuel', component:TraitementCollectifComponent
    },
    {
      path: 'ajout_programme', component:AjoutProgrammeComponent
    },
    // admin
    {
      path: 'liste_requete3', component:ListeRequete3Component
    },
    {
      path: 'etudiant', component:EtudiantComponent
    },
    {
      path: 'enseignant', component:EnseignantComponent
    },
    {
      path: 'suivis', component:SuivisComponent
    },
    {
      path: 'transfert_etudiant', component:TransfertEtudiantComponent
    },
    {
      path: 'transfert_enseignant', component:TransfertEnseignantComponent
    },
    {
      path: 'ajout_programmes', component:AjoutProgrammesComponent
    },
    {
      path: 'programme_admin', component:ProgrammeAdminComponent
    },
];
