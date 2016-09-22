import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Art } from './art';
import { ArtworkService } from './artwork.service';  // model
import { Category } from './category';
import { CategoryService } from './category.service';
import { OnInit } from '@angular/core';


// view
@Component({
  selector: 'my-artworks-category',
  templateUrl: 'app/artworks-category.component.html',
  styleUrls: [ 'app/artworks-category.component.css' ]
})

// controller
export class ArtworksCategoryComponent implements OnInit {

  ngOnInit():void { 
    this.route.params.forEach((params:Params) => {
      let cat = +params['category'];  // TODO: check syntax
      this.artworkService.getSubset(cat)
      .then(artworks => this.artworks = artworks);
    });
  }

  // this constructor adds a private property that is of type projectService to the 
  // AppComponent class. It's a projectService injection site.
  constructor(
    private artworkService:ArtworkService,
    private categoryService:CategoryService,
    private router:Router,
    private route:ActivatedRoute) { }

  category:Category;
  selectedArtwork:Art;
  artworks:Art[];
  innerWidth:number = window.innerWidth;

  onResize(event) {
    event.target.innerWith;
  }

  onSelect(artwork:Art): void {
    this.selectedArtwork = artwork;
  }

  goToDetail(artwork:Art):void {
    this.onSelect(artwork);
    this.router.navigate(['/artwork', this.selectedArtwork.id]);
  }

}