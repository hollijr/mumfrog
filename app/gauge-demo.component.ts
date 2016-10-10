import { Component, ViewChild, AfterViewInit  } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'my-gauge-demo',
  template: `
    <div class="container">
      <canvas #myCanvas width="200" height="200" style="background:lightgray;">Your browser does not support HTML5 Canvas</canvas>
      <div>Width <input type="range" min="1" max="200" [(ngModel)]="rectW" (change)="redraw()"> </div>
      <div>Height <input type="range" min="1" max="200" [(ngModel)]="rectH" (change)="redraw()"> </div>
      <div>Color <input type="color" [(ngModel)]="rectColor" placeholder="color" value="{{rectColor}}"> </div>
    </div>`,
  styles: [`
    canvas {
      border: solid 1px red;
    }
    .container {
      width: 200px;
    }
  `]
})

export class GaugeDemoComponent implements AfterViewInit  {
  rectW:number = 100;
  rectH:number = 100;
  rectColor:string = "#FF0000";
  context:CanvasRenderingContext2D;

  @ViewChild("myCanvas") myCanvas;

  ngAfterViewInit() {
    let canvas = this.myCanvas.nativeElement;
    this.context = canvas.getContext("2d");
    this.redraw();
  }

  redraw() {

    requestAnimationFrame(() => {
      this.redraw();
    });

    var ctx = this.context;
    ctx.clearRect(0,0,400,400);
    ctx.fillStyle = this.rectColor;
    ctx.fillRect(0,0,this.rectW,this.rectH);
  }

}