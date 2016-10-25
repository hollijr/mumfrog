import { Component, ViewChild, AfterViewInit  } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'my-gauge-demo',
  templateUrl: 'app/gauge-demo.component.html',
  styleUrls: ['app/gauge-demo.component.css']
})

export class TankDemoComponent implements AfterViewInit  {

  @ViewChild("gaugeCanvas") gaugeCanvas;
  @ViewChild("sliderCanvas") sliderCanvas;

  // class variables
  

  ngAfterViewInit() {

  }

  resetSettings():void {
    
  }

}  // end class
