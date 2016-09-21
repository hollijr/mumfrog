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
var project_service_1 = require('./project.service'); // model
// view
var AboutComponent = (function () {
    // this constructor adds a private property that is of type projectService to the 
    // AppComponent class. It's a projectService injection site.
    function AboutComponent(projectService, router) {
        this.projectService = projectService;
        this.router = router;
        this.innerWidth = window.innerWidth;
    }
    AboutComponent.prototype.ngOnInit = function () {
        this.getProjects();
    };
    AboutComponent.prototype.onResize = function (event) {
        event.target.innerWith;
    };
    AboutComponent.prototype.onSelect = function (project) {
        this.selectedProject = project;
    };
    AboutComponent.prototype.getProjects = function () {
        var _this = this;
        // simulate server response delay using getprojectesSlowly() instead of getprojectes()
        this.projectService.getProjects().then(function (response) {
            _this.projects = response;
        });
    };
    AboutComponent.prototype.goToDetail = function (project) {
        this.onSelect(project);
        this.router.navigate(['/detail', this.selectedProject.id]);
    };
    AboutComponent = __decorate([
        core_1.Component({
            selector: 'my-projects',
            templateUrl: 'app/projects.component.html',
            styleUrls: ['app/projects.component.css']
        }), 
        __metadata('design:paramtypes', [project_service_1.ProjectService, router_1.Router])
    ], AboutComponent);
    return AboutComponent;
}());
exports.AboutComponent = AboutComponent;
//# sourceMappingURL=about.component.js.map