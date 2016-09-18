// this is the root module.  it is the entry point to the application.

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard.component';
import { ProjectsComponent } from './projects.component';
import { ProjectDetailComponent } from './project-detail.component';

import { ProjectService } from './project.service';
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
    DashboardComponent,
    ProjectsComponent,
    ProjectDetailComponent
  ],
  providers: [ 
    ProjectService
  ],
  bootstrap: [ AppComponent ],
})

export class AppModule { }