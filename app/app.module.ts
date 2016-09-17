// this is the root module.  it is the entry point to the application.

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard.component';
import { HeroesComponent } from './heroes.component';
import { HeroDetailComponent } from './hero-detail.component';

import { HeroService } from './hero.service';
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
    HeroesComponent,
    HeroDetailComponent
  ],
  providers: [ 
    HeroService
  ],
  bootstrap: [ AppComponent ],
})

export class AppModule { }