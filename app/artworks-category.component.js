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
var category_service_1 = require('./category.service');
// view
var ArtworksCategoryComponent = (function () {
    // this constructor adds a private property that is of type projectService to the 
    // AppComponent class. It's a projectService injection site.
    function ArtworksCategoryComponent(artworkService, categoryService, router, route) {
        this.artworkService = artworkService;
        this.categoryService = categoryService;
        this.router = router;
        this.route = route;
        this.innerWidth = window.innerWidth;
    }
    ArtworksCategoryComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.forEach(function (params) {
            var cat = +params['category']; // TODO: check syntax
            _this.artworkService.getSubset(cat)
                .then(function (artworks) { return _this.artworks = artworks; });
        });
    };
    ArtworksCategoryComponent.prototype.onResize = function (event) {
        event.target.innerWith;
    };
    ArtworksCategoryComponent.prototype.onSelect = function (artwork) {
        this.selectedArtwork = artwork;
    };
    ArtworksCategoryComponent.prototype.goToDetail = function (artwork) {
        this.onSelect(artwork);
        this.router.navigate(['/artwork', this.selectedArtwork.id]);
    };
    ArtworksCategoryComponent = __decorate([
        core_1.Component({
            selector: 'my-artworks-category',
            templateUrl: 'app/artworks-category.component.html',
            styleUrls: ['app/artworks-category.component.css']
        }), 
        __metadata('design:paramtypes', [artwork_service_1.ArtworkService, category_service_1.CategoryService, router_1.Router, router_1.ActivatedRoute])
    ], ArtworksCategoryComponent);
    return ArtworksCategoryComponent;
}());
exports.ArtworksCategoryComponent = ArtworksCategoryComponent;
//# sourceMappingURL=artworks-category.component.js.map