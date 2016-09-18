"use strict";
var router_1 = require('@angular/router');
var projects_component_1 = require('./projects.component');
var dashboard_component_1 = require('./dashboard.component');
var project_detail_component_1 = require('./project-detail.component');
var appRoutes = [
    {
        // redirect
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
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
    }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map