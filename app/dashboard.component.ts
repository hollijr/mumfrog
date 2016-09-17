import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HeroService } from './hero.service';
import { Hero } from './hero';

@Component({
  selector: 'my-dashboard',
  templateUrl: 'app/dashboard.component.html',
  styleUrls: ['app/dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  constructor(
    private heroService:HeroService,
    private router:Router) {}

  ngOnInit():void {
    this.heroService.getHeroes()
    .then(heroes => this.heroes = heroes.slice(1,5));
  }

  heroes:Hero[] = [];

  goToDetail(hero:Hero):void {
    let link = ['/detail', hero.id];
    this.router.navigate(link);
  }
}