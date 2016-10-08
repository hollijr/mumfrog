import { Component, ViewChild, AfterViewChecked  } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'my-gauge-demo',
  template: `
    <div>
      <canvas #myCanvas width="400" height="400" style="background:lightgray;">Your browser does not support HTML5 Canvas</canvas>
      <div>Width <input type="range" min="1" max="400" [(ngModel)]="rectW"></div>
    </div>
  `,
  styles: [`
  canvas {
    border: solid 1px black;
    width: 400px;
      height: 400px;
  }
  `]
})

export class GaugeDemoComponent implements AfterViewChecked {
  rectW:number = 100;
  rectH:number = 100;
  rectColor:string = "#FF0000";
  context:CanvasRenderingContext2D;

  @ViewChild("myCanvas") myCanvas;

  ngAfterViewChecked() {
    let canvas = this.myCanvas.nativeElement;
    this.context = canvas.getContext("2d");
    this.tick();
  }

  tick() {

    var ctx = this.context;
    ctx.clearRect(0,0,400,400);
    ctx.fillStyle = this.rectColor;
    ctx.fillRect(0,0,this.rectW,this.rectH);
  }

}