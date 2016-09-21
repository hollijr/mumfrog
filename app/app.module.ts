// this is the root module.  it is the entry point to the application.

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home.component';
import { DashboardComponent } from './dashboard.component';
import { ProjectsComponent } from './projects.component';
import { ProjectDetailComponent } from './project-detail.component';
import { ArtworksComponent } from './artworks.component';
import { AboutComponent } from './about.component';

import { ProjectService } from './project.service';
import { ArtworkService } from './artwork.service';
import { routing } from './app.routing';

// since this project is a web application that runs in the browser, 
// must import the BrowserModule from @angular/platform-browser to the imports array
@NgModule({
  imports:  [
    BrowserModule,
    FormsModule,
    routing
  ],
  declarations: [ 
    AppComponent,
    HomeComponent,
    DashboardComponent,
    ProjectsComponent,
    ProjectDetailComponent,
    ArtworksComponent,
    AboutComponent
  ],
  providers: [ 
    ProjectService,
    ArtworkService
  ],
  bootstrap: [ AppComponent ],
})

export class AppModule { }