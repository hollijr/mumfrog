// this is the root module.  it is the entry point to the application.
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
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var app_component_1 = require('./app.component');
var home_component_1 = require('./home.component');
var dashboard_component_1 = require('./dashboard.component');
var projects_component_1 = require('./projects.component');
var project_detail_component_1 = require('./project-detail.component');
var artworks_component_1 = require('./artworks.component');
var artwork_detail_component_1 = require('./artwork-detail.component');
var about_component_1 = require('./about.component');
var project_service_1 = require('./project.service');
var artwork_service_1 = require('./artwork.service');
var category_service_1 = require('./category.service');
var app_routing_1 = require('./app.routing');
// since this project is a web application that runs in the browser, 
// must import the BrowserModule from @angular/platform-browser to the imports array
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                app_routing_1.routing
            ],
            declarations: [
                app_component_1.AppComponent,
                home_component_1.HomeComponent,
                dashboard_component_1.DashboardComponent,
                projects_component_1.ProjectsComponent,
                project_detail_component_1.ProjectDetailComponent,
                artworks_component_1.ArtworksComponent,
                artwork_detail_component_1.ArtworkDetailComponent,
                about_component_1.AboutComponent
            ],
            providers: [
                project_service_1.ProjectService,
                artwork_service_1.ArtworkService,
                category_service_1.CategoryService
            ],
            bootstrap: [app_component_1.AppComponent],
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map