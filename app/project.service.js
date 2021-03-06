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
var mock_projects_1 = require('./mock-projects');
var gauge_demo_component_1 = require('./gauge-demo.component');
var ProjectService = (function () {
    function ProjectService() {
        this.favoriteIds = [11, 23, 24, 12];
        this.componentTable = {
            'GaugeDemoComponent': gauge_demo_component_1.GaugeDemoComponent
        };
    }
    ProjectService.prototype.getProjects = function () {
        return Promise.resolve(mock_projects_1.PROJECTS);
    };
    ProjectService.prototype.getProjectsSlowly = function () {
        return new Promise(function (resolve) {
            return setTimeout(resolve, 2000);
        }) // delay 2 seconds
            .then(this.getProjects);
    };
    ProjectService.prototype.getProject = function (id) {
        var _this = this;
        return this.getProjects()
            .then(function (projects) { return projects.find(function (project) { return project.id === id; }); })
            .then(function (project) {
            if (project.componentName) {
                project.component = _this.componentTable[project.componentName];
            }
            return project;
        });
    };
    ProjectService.prototype.getFavorites = function () {
        var _this = this;
        return this.getProjects()
            .then(function (projects) { return projects.filter(function (project) { return _this.favoriteIds.includes(project.id); }); });
    };
    ProjectService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], ProjectService);
    return ProjectService;
}());
exports.ProjectService = ProjectService;
//# sourceMappingURL=project.service.js.map