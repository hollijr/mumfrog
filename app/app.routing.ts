import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectsComponent } from './projects.component';
import { DashboardComponent } from './dashboard.component';
import { ProjectDetailComponent } from './project-detail.component';
import { AppComponent } from './app.component';

const appRoutes:Routes = [
  {
    // redirect
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
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
  }
];

export const routing:ModuleWithProviders = RouterModule.forRoot(appRoutes);