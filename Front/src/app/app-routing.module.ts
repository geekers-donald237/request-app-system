import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {DefaultLayoutComponent} from './containers';
import {Page404Component} from './views/pages/page404/page404.component';
import {Page500Component} from './views/pages/page500/page500.component';
import {LoginComponent} from './views/pages/login/login.component';
import {RegisterComponent} from './views/pages/register/register.component';
import {AcceuilComponent} from "./features/screens/acceuil/acceuil/acceuil.component";
import {ProfileComponent} from "./features/screens/profile/profile.component";

const routes: Routes = [

  {
    path: '',
    pathMatch: 'full',
    component: AcceuilComponent,
    data: {
      title: 'home'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'home'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./views/dashboard/dashboard.module').then((m) => m.DashboardModule)
      },

      {
        path: 'widgets',
        loadChildren: () =>
          import('./views/widgets/widgets.module').then((m) => m.WidgetsModule)
      },
      {
        path: 'pages',
        loadChildren: () =>
          import('./views/pages/pages.module').then((m) => m.PagesModule)
      },
      {
        path: 'app',
        loadChildren: () =>
          import('./features/screens/screens.module').then((m) => m.ScreensModule)
      }
    ]
  },
  {
    path: '404',
    component: Page404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: Page500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {
    path: 'profil',
    component: ProfileComponent,
    data: {
      title: 'profil page'
    }
  },


  {path: '**', redirectTo: '404'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking'
      // relativeLinkResolution: 'legacy'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
