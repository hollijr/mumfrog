import { Injectable } from '@angular/core';

import { Project } from './project';
import { PROJECTS } from './mock-projects';

import { GaugeDemoComponent } from './gauge-demo.component';

@Injectable ()

export class ProjectService {

  componentTable = {
    'GaugeDemoComponent': GaugeDemoComponent
  };

  getProjects():Promise<Project[]> {
    return Promise.resolve(PROJECTS);
  }
  getProjectsSlowly():Promise<Project[]> {
    return new Promise<Project[]>(resolve =>
      setTimeout(resolve, 2000)) // delay 2 seconds
      .then(this.getProjects);
  }
  getProject(id:number):Promise<Project> {
    return this.getProjects()
                .then(projects => projects.find(project => project.id === id))
                .then((project) => {
                  if (project.componentName) {
                    project.component = this.componentTable[project.componentName];
                  }
                  return project;
                });
  }
}