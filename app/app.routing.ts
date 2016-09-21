import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { ProjectsComponent } from './projects.component';
import { DashboardComponent } from './dashboard.component';
import { ProjectDetailComponent } from './project-detail.component';
import { AppComponent } from './app.component';
import { AboutComponent } from './about.component';

const appRoutes:Routes = [
  {
    // redirect
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'projects',
    component: ProjectsComponent
  },
  {
    path: 'detail/:id',
    component: ProjectDetailComponent
  },
  {
    path: 'about',
    component: AboutComponent
  }
];

export const routing:ModuleWithProviders = RouterModule.forRoot(appRoutes);