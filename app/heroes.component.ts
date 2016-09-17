import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Hero } from './hero';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroService } from './hero.service';  // model
import { OnInit } from '@angular/core';


// view
@Component({
  selector: 'my-heroes',
  templateUrl: 'app/heroes.component.html',
  styleUrls: [ 'app/heroes.component.css']
})

// controller
export class HeroesComponent implements OnInit {

  ngOnInit():void {
    this.getHeroes();
  }
  // this constructor adds a private property that is of type HeroService to the 
  // AppComponent class. It's a HeroService injection site.
  constructor(
    private heroService:HeroService,
    private router:Router) { }
  selectedHero:Hero;
  
  heroes:Hero[];
  onSelect(hero:Hero): void {
    this.selectedHero = hero;
  }

  getHeroes():void {
    // simulate server response delay using getHeroesSlowly() instead of getHeroes()
    this.heroService.getHeroes().then((response) => {
      this.heroes = response;
    });  
  }

  goToDetail():void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }
}
