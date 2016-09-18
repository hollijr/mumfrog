import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from './project';
import { ProjectDetailComponent } from './project-detail.component';
import { ProjectService } from './project.service';  // model
import { OnInit } from '@angular/core';


// view
@Component({
  selector: 'my-projects',
  templateUrl: 'app/projects.component.html',
  styleUrls: [ 'app/projects.component.css' ]
})

// controller
export class ProjectsComponent implements OnInit {

  ngOnInit():void {
    this.getProjects();
  }
  // this constructor adds a private property that is of type projectService to the 
  // AppComponent class. It's a projectService injection site.
  constructor(
    private projectService:ProjectService,
    private router:Router) { }

  selectedProject:Project;
  projects:Project[];

  onSelect(project:Project): void {
    this.selectedProject = project;
  }

  getProjects():void {
    // simulate server response delay using getprojectesSlowly() instead of getprojectes()
    this.projectService.getProjects().then((response) => {
      this.projects = response;
    });  
  }

  goToDetail(project:Project):void {
    this.onSelect(project);
    this.router.navigate(['/detail', this.selectedProject.id]);
  }
}
