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
var ProjectsComponent = (function () {
    // this constructor adds a private property that is of type projectService to the 
    // AppComponent class. It's a projectService injection site.
    function ProjectsComponent(projectService, router) {
        this.projectService = projectService;
        this.router = router;
        this.innerWidth = window.innerWidth;
    }
    ProjectsComponent.prototype.ngOnInit = function () {
        this.getProjects();
    };
    ProjectsComponent.prototype.onResize = function (event) {
        event.target.innerWith;
    };
    ProjectsComponent.prototype.onSelect = function (project) {
        this.selectedProject = project;
    };
    ProjectsComponent.prototype.getProjects = function () {
        var _this = this;
        // simulate server response delay using getprojectesSlowly() instead of getprojects()
        this.projectService.getProjects().then(function (response) {
            _this.projects = response;
        });
    };
    ProjectsComponent.prototype.goToDetail = function (project) {
        this.onSelect(project);
        this.router.navigate(['/detail', this.selectedProject.id]);
    };
    ProjectsComponent = __decorate([
        core_1.Component({
            selector: 'my-projects',
            templateUrl: 'app/projects.component.html',
            styleUrls: ['app/project-styles.css', 'app/projects.component.css']
        }), 
        __metadata('design:paramtypes', [project_service_1.ProjectService, router_1.Router])
    ], ProjectsComponent);
    return ProjectsComponent;
}());
exports.ProjectsComponent = ProjectsComponent;
//# sourceMappingURL=projects.component.js.map