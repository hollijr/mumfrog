import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ProjectService } from './project.service';
import { Project } from './project';
import { GaugeDemoComponent } from './gauge-demo.component';
import { DclWrapper } from './dclwrapper.component'; 

@Component({
  selector: 'my-project-detail',
  templateUrl: 'app/project-detail.component.html',
  styleUrls: ['app/project-detail.component.css']
})

export class ProjectDetailComponent implements OnInit  {

  constructor(
    private projectService:ProjectService, 
    private route:ActivatedRoute) {  
  }

  ngOnInit():void {
    this.route.params.forEach((params:Params) => {
      let id = +params['id'];
      this.projectService.getProject(id)
      .then(project => this.project = project);
    });
  }

  project:Project;

  goBack():void {
    window.history.back();
  }
}