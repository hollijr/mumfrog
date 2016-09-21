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
var ArtworkService = (function () {
    function ArtworkService() {
    }
    ArtworkService.prototype.getArtworks = function () {
        return Promise.resolve(mock_cookies_1.COOKIES); // append all data together
    };
    ArtworkService.prototype.getCookies = function () {
        return Promise.resolve(mock_cookies_1.COOKIES);
    };
    ArtworkService.prototype.getCookiesSlowly = function () {
        return new Promise(function (resolve) {
            return setTimeout(resolve, 2000);
        }) // delay 2 seconds
            .then(this.getCookies);
    };
    ArtworkService.prototype.getArtwork = function (id) {
        var sid = id.toString();
        if (sid.charAt(0) === '1') {
            return this.getCookies()
                .then(function (cookies) { return cookies.find(function (cookie) { return cookie.id === id; }); });
        }
        return this.getCookies()
            .then(function (cookies) { return cookies.find(function (cookie) { return cookie.id === id; }); });
    };
    ArtworkService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], ArtworkService);
    return ArtworkService;
}());
exports.ArtworkService = ArtworkService;
//# sourceMappingURL=artwork.service.js.map