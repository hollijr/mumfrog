import { Injectable } from '@angular/core';

import { Project } from './project';
import { PROJECTS } from './mock-projects';

@Injectable ()

export class ProjectService {
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
                .then(projects => projects.find(project => project.id === id));
  }
}