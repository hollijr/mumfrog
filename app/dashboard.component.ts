import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProjectService } from './project.service';
import { Project } from './project';

@Component({
  selector: 'my-dashboard',
  templateUrl: 'app/dashboard.component.html',
  styleUrls: ['app/dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  constructor(
    private projectService:ProjectService,
    private router:Router) {}

  ngOnInit():void {
    this.projectService.getProjects()
    .then(projects => this.favorites = projects.slice(0,4));
  }

  favorites:Project[] = [];

  goToDetail(project:Project):void {
    let link = ['/detail', project.id];
    this.router.navigate(link);
  }
}