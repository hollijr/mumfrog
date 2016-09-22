import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Art } from './art';
import { ArtworkService } from './artwork.service';  // model
import { Category } from './category';
import { CategoryService } from './category.service';
import { OnInit } from '@angular/core';


// view
@Component({
  selector: 'my-artworks',
  templateUrl: 'app/artworks.component.html',
  styleUrls: [ 'app/artworks.component.css' ]
})

// controller
export class ArtworksComponent implements OnInit {

  ngOnInit():void {
    this.getArtworks();  
  }
  // this constructor adds a private property that is of type projectService to the 
  // AppComponent class. It's a projectService injection site.
  constructor(
    private artworkService:ArtworkService,
    private categoryService:CategoryService,
    private router:Router) { }

  categories:Category[];
  selectedArtwork:Art;
  artworks:[Art[]];
  innerWidth:number = window.innerWidth;

  onResize(event) {
    event.target.innerWith;
  }

  onSelect(artwork:Art): void {
    this.selectedArtwork = artwork;
  }

  getArtworks():void {
    this.categoryService.getCategories().then((response) => {
      this.categories = response;
      this.artworkService.getArtworks().then((result) => {
        this.artworks = result;
      });
    });
  }

  goToDetail(artwork:Art):void {
    this.onSelect(artwork);
    this.router.navigate(['/artwork', this.selectedArtwork.id]);
  }

}
