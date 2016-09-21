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
var mock_cookies_1 = require('./mock-cookies');
var ArtWorkService = (function () {
    function ArtWorkService() {
    }
    ArtWorkService.prototype.getCookies = function () {
        return Promise.resolve(mock_cookies_1.COOKIES);
    };
    ArtWorkService.prototype.getCookiesSlowly = function () {
        return new Promise(function (resolve) {
            return setTimeout(resolve, 2000);
        }) // delay 2 seconds
            .then(this.getCookies);
    };
    ArtWorkService.prototype.getArtWork = function (id) {
        if (id < 1000) {
            return this.getCookies()
                .then(function (cookies) { return cookies.find(function (cookie) { return cookie.id === id; }); });
        }
        return this.getCookies()
            .then(function (cookies) { return cookies.find(function (cookie) { return cookie.id === id; }); });
    };
    ArtWorkService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], ArtWorkService);
    return ArtWorkService;
}());
exports.ArtWorkService = ArtWorkService;
//# sourceMappingURL=artwork.service.js.map