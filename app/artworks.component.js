"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var artwork_service_1 = require('./artwork.service'); // model
// view
var ArtworksComponent = (function () {
    // this constructor adds a private property that is of type projectService to the 
    // AppComponent class. It's a projectService injection site.
    function ArtworksComponent(artworkService, router) {
        this.artworkService = artworkService;
        this.router = router;
        this.innerWidth = window.innerWidth;
    }
    ArtworksComponent.prototype.ngOnInit = function () {
        this.getArtworks();
    };
    ArtworksComponent.prototype.onResize = function (event) {
        event.target.innerWith;
    };
    ArtworksComponent.prototype.onSelect = function (artwork) {
        this.selectedArtwork = artwork;
    };
    ArtworksComponent.prototype.getArtworks = function () {
        var _this = this;
        // simulate server response delay using getprojectesSlowly() instead of getprojectes()
        this.artworkService.getArtworks().then(function (response) {
            _this.artworks = response;
        });
    };
    ArtworksComponent.prototype.goToDetail = function (artwork) {
        this.onSelect(artwork);
        this.router.navigate(['/artwork', this.selectedArtwork.id]);
    };
    ArtworksComponent = __decorate([
        core_1.Component({
            selector: 'my-artworks',
            templateUrl: 'app/artworks.component.html',
            styleUrls: ['app/artworks.component.css']
        }), 
        __metadata('design:paramtypes', [artwork_service_1.ArtworkService, router_1.Router])
    ], ArtworksComponent);
    return ArtworksComponent;
}());
exports.ArtworksComponent = ArtworksComponent;
//# sourceMappingURL=artworks.component.js.map