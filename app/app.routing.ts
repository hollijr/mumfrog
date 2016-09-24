import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { ProjectsComponent } from './projects.component';
import { DashboardComponent } from './dashboard.component';
import { ProjectDetailComponent } from './project-detail.component';
import { ArtworksComponent } from './artworks.component';
import { ArtworkDetailComponent } from './artwork-detail.component';
import { AppComponent } from './app.component';
import { AboutComponent } from './about.component';

const appRoutes:Routes = [
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
    path: 'artworks',
    component: ArtworksComponent
  },
  {
    path: 'artwork/:id',
    component: ArtworkDetailComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    // redirect
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

export const routing:ModuleWithProviders = RouterModule.forRoot(appRoutes);