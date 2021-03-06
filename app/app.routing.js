"use strict";
var router_1 = require('@angular/router');
var home_component_1 = require('./home.component');
var projects_component_1 = require('./projects.component');
var dashboard_component_1 = require('./dashboard.component');
var project_detail_component_1 = require('./project-detail.component');
var artworks_component_1 = require('./artworks.component');
var artwork_detail_component_1 = require('./artwork-detail.component');
var about_component_1 = require('./about.component');
var appRoutes = [
    {
        path: 'home',
        component: home_component_1.HomeComponent
    },
    {
        path: 'dashboard',
        component: dashboard_component_1.DashboardComponent
    },
    {
        path: 'projects',
        component: projects_component_1.ProjectsComponent
    },
    {
        path: 'detail/:id',
        component: project_detail_component_1.ProjectDetailComponent
    },
    {
        path: 'artworks',
        component: artworks_component_1.ArtworksComponent
    },
    {
        path: 'artwork/:id',
        component: artwork_detail_component_1.ArtworkDetailComponent
    },
    {
        path: 'about',
        component: about_component_1.AboutComponent
    },
    {
        // redirect
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map