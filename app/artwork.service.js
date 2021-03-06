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
var mock_artwork_1 = require('./mock-artwork');
var ArtworkService = (function () {
    function ArtworkService() {
    }
    ArtworkService.prototype.getArtworks = function () {
        return Promise.resolve(mock_artwork_1.ARTWORK); // returns an array of artwork arrays
    };
    ArtworkService.prototype.getSubset = function (category) {
        return Promise.resolve(mock_artwork_1.ARTWORK[category]);
    };
    ArtworkService.prototype.getArtwork = function (id) {
        var n = id;
        // find first digit of id
        while (n > 9) {
            n = Math.trunc(n / 10);
        }
        return this.getSubset(n - 1)
            .then(function (subset) { return subset.find(function (art) { return art.id === id; }); });
    };
    ArtworkService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], ArtworkService);
    return ArtworkService;
}());
exports.ArtworkService = ArtworkService;
//# sourceMappingURL=artwork.service.js.map