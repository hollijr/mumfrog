import { Component } from '@angular/core';
import { Router } from '@angular/router';

// view
@Component({
  selector: 'my-about',
  templateUrl: 'app/about.component.html',
  styleUrls: [ 'app/about.component.css' ]
})

// controller
export class AboutComponent { 

  constructor(private router:Router) { }

  goHome():void {
    this.router.navigate(['/home']);
  }
}
