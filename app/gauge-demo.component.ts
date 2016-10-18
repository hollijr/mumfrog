import { Component, ViewChild, AfterViewInit  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Gauge } from './gauge';

@Component({
  selector: 'my-gauge-demo',
  templateUrl: 'app/gauge-demo.component.html',
  styleUrls: ['app/gauge-demo.component.css']
})

export class GaugeDemoComponent implements AfterViewInit  {

  @ViewChild("gaugeCanvas") gaugeCanvas;
  @ViewChild("sliderCanvas") sliderCanvas;

  // class variables
  ctx:CanvasRenderingContext2D;
	canvasHt:number;
	canvasWd:number;
	sliderX:number = 30;
	maxSteps:number;
  sliderHeight:number;
  sliderY:number;
  handleY:number;
  pxInterval:number; // handleY is current location of slider handle
	handleHalfWd:number = 12;
  handleHalfHt:number = 2;  
	mousedown:boolean = false;
  sliderCtrlValue:number = 0;
  gaugeSettings = {
    inputGranularity : 1,
    titleLine1 : "ACCUMULATOR",
    titleLine2 : "PRESSURE",
    titleFont : "18pt Arial",
    gaugeDiam : 175,
    rimWidth : 25,
    faceColor : "white",
    centerX : 200,
    centerY : 250,
    startDegree : 135,
    endDegree : 405,
    outerScaleDiam : 100,
    outerScaleRange : {s: 0, e: 6000},
    outerScaleIntervals : [500,100,0],  // not using third interval at present
    outerScaleFnt : "8pt Calibri",
    outerScaleColor : "black",
    outerScaleUnit : "PSI",
    hasInnerScale : true,
    innerScaleConvFactor : 0.068573,
    innerScaleDiam : 96,
    innerScaleStartLabel : 0,
    innerScaleIntervals : [50,10,0],
    innerScaleFnt : "8pt Arial",
    innerScaleColor : "red",
    innerScaleUnit : "Kg/cm3",
    innerScaleToEnd : true,
    dialBaseDiam : 25,
    pointerColor: "blue",
    digWd : 60,
    digHt : 14,
    digFnt : "12pt Calibri",
    digBC : "#efefef"
  };
  gauge:Gauge;
  // simulation variables
  isRunning:boolean = false;
  inputLevels = {curr : this.gaugeSettings.outerScaleRange.s, targ: this.calcTarget()};
	delay:number = Math.round(Math.random()*20);
  timeoutLen:number = 500;
	timer;
  tick:number = 0;
  demoBtnLbl:string = "Start Simulation";
  demoStatusLbl:string = "";

  ngAfterViewInit() {

    // Build the gauge
    this.gaugeCanvas = this.gaugeCanvas.nativeElement;
    this.gauge = new Gauge(this.gaugeCanvas, this.gaugeSettings);
    this.gauge.drawScreen();
      
    // Build the slider so user can simulate input
    this.sliderCanvas = this.sliderCanvas.nativeElement;
    this.canvasHt = parseInt(this.sliderCanvas.getAttribute('height'), 10);
	  this.canvasWd = parseInt(this.sliderCanvas.getAttribute('width'), 10);
    this.ctx = this.sliderCanvas.getContext("2d");
		this.setSliderValues();
    this.drawSlider();

		window.addEventListener('mouseup', (evt) => {
			this.mousedown = false;
		});
  }

  resetSettings():void {
    this.gaugeSettings.inputGranularity = 1;
    this.gaugeSettings.titleLine1 = "ACCUMULATOR";
    this.gaugeSettings.titleLine2 = "PRESSURE";
    this.gaugeSettings.titleFont = "18pt Arial";
    this.gaugeSettings.gaugeDiam = 175;
    this.gaugeSettings.rimWidth = 25;
    this.gaugeSettings.faceColor = "white";
    this.gaugeSettings.centerX = 200;
    this.gaugeSettings.centerY = 250;
    this.gaugeSettings.startDegree = 135;
    this.gaugeSettings.endDegree = 405;
    this.gaugeSettings.outerScaleDiam = 100;
    this.gaugeSettings.outerScaleRange = {s: 0, e: 6000};
    this.gaugeSettings.outerScaleIntervals = [500,100,0];  // not using third interval at present
    this.gaugeSettings.outerScaleFnt = "8pt Calibri";
    this.gaugeSettings.outerScaleColor = "black";
    this.gaugeSettings.outerScaleUnit = "PSI";
    this.gaugeSettings.hasInnerScale = true;
    this.gaugeSettings.innerScaleConvFactor = 0.068573;
    this.gaugeSettings.innerScaleDiam = 96;
    this.gaugeSettings.innerScaleStartLabel = 0;
    this.gaugeSettings.innerScaleIntervals = [50,10,0];
    this.gaugeSettings.innerScaleFnt = "8pt Arial";
    this.gaugeSettings.innerScaleColor = "red";
    this.gaugeSettings.innerScaleUnit = "Kg/cm3";
    this.gaugeSettings.innerScaleToEnd = true;
    this.gaugeSettings.dialBaseDiam = 25;
    this.gaugeSettings.pointerColor = "blue";
    this.gaugeSettings.digWd = 60;
    this.gaugeSettings.digHt = 14;
    this.gaugeSettings.digFnt = "12pt Calibri";
    this.gaugeSettings.digBC = "#efefef";
	}

  setSliderValues():void {
			this.maxSteps = this.gaugeSettings.outerScaleRange.e - this.gaugeSettings.outerScaleRange.s + 1;
			this.sliderHeight = this.canvasHt - 10;  // initial slider height is 10 pixels less than canvas height
			this.sliderY = this.sliderHeight + 5; // (x,y) location of center base of slider
			this.handleY = this.sliderY;  // handleY is current location of slider handle
			this.pxInterval = Math.floor(this.sliderHeight / this.maxSteps * this.gaugeSettings.outerScaleIntervals[1]);
	}

  drawSlider():void {
    this.ctx.rect(0,0,this.canvasWd,this.canvasHt);
    this.ctx.clip();
    this.ctx.clearRect(0,0,this.canvasWd,this.canvasHt);

    var y = this.sliderY;
    
    // draw slider tick marks			
    this.ctx.lineWidth = 1;
    for (var i = 0; i < this.maxSteps; i = i + this.gaugeSettings.outerScaleIntervals[1]) {
      this.drawLine(i, y);
      y -= this.pxInterval;
    }

    y += this.pxInterval;
    this.sliderHeight = this.sliderY - y;  // adjust slider height to actual height based on pixel interval

    // draw vertical slider line
    this.ctx.strokeStyle = "blue";
    this.ctx.lineWidth = 5;
    this.ctx.beginPath();
    this.ctx.moveTo(this.sliderX, this.sliderY);
    this.ctx.lineTo(this.sliderX, y);
    this.ctx.stroke();
    this.ctx.closePath();

    // draw slider handle
    this.ctx.fillStyle = "black";
    this.ctx.beginPath();
    this.ctx.arc(this.sliderX - this.handleHalfWd, this.handleY, this.handleHalfHt, (Math.PI/180)*90, (Math.PI/180)*270, false);
    this.ctx.lineTo(this.sliderX + this.handleHalfWd, this.handleY - this.handleHalfHt);
    this.ctx.arc(this.sliderX + this.handleHalfWd, this.handleY, this.handleHalfHt, (Math.PI/180)*270, (Math.PI/180)*450, false);
    this.ctx.lineTo(this.sliderX - this.handleHalfWd, this.handleY + this.handleHalfHt);
    this.ctx.fill();
    this.ctx.closePath();
  } // end drawSlider()

  drawLine(i, y):void {
    var x1 = this.sliderX - 5, x2 = this.sliderX + 5, label = false;
    if (i % this.gaugeSettings.outerScaleIntervals[0] === 0) {
        x1 -= 3;
        x2 += 3;
        label = true;
      }
    this.ctx.beginPath();
    this.ctx.moveTo(x1, y);
    this.ctx.lineTo(x2, y);
    this.ctx.stroke();
    this.ctx.closePath();
    if (label) {
      this.ctx.fillStyle = "blue";
      this.ctx.textBaseline = "middle";
      this.ctx.textAlign = "start";
      this.ctx.fillText(i.toString(), x2 + 8, y);
    }
  }  // end drawLine()

  setMouseDown(isDown) {
    this.mousedown = isDown;
  }  // end setMouseDown()

	onSliderMouseMove(evt:Event):void {
    if (this.mousedown) {
      var mousePos = this.getMousePos(this.sliderCanvas, evt);
      //var message = onHandle + " -- Mouse position: " + mousePos.x + "," + mousePos.y + " || " + mousePos.msg;
      //writeMessage(this, message);
      if (this.isOnSlider(mousePos) && !this.isRunning) {
        var value = (this.sliderY - mousePos.y) / this.sliderHeight * this.maxSteps;
        
        //console.log(value);
        if (value < 0) {
          this.handleY = this.sliderY;
        } else if (value >= this.maxSteps) {
          this.handleY = this.sliderY - this.sliderHeight;
        } else {
          this.handleY = mousePos.y;
        }
        this.drawSlider();
        if (!this.isRunning) {
          // update gauge needle
          this.gauge.setInputLevel(value);
          this.gauge.drawScreen();
          // update html slider
          this.sliderCtrlValue = value / this.maxSteps * 100;
        }
      }
    }
  } // end onSliderMouseMove()

  getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect(), root = document.documentElement;

    // return relative mouse position
    var mouseX = evt.clientX - rect.left - root.scrollLeft;
    var mouseY = evt.clientY - rect.top - root.scrollTop;
    var pos = {x: mouseX, y: mouseY, msg: "cx: " + evt.clientX + ", cy: " + evt.clientY + ", t: " + rect.top + ", l: " + rect.left + ", st:" + root.scrollTop + ", sl:" + root.scrollLeft};
    //console.log(pos);
    return pos;
  }  // end getMousePos()

  isOnSlider(mousePos):boolean {
    if (mousePos.x >= this.sliderX - this.handleHalfWd * 2 && mousePos.x <= this.sliderX + this.handleHalfWd * 2 &&
        mousePos.y >= this.sliderY - this.sliderHeight && mousePos.y <= this.sliderY) {
      return true;
    }
    return false;
  }  // end isOnSlider()

  calcTarget():number {
    return this.gaugeSettings.outerScaleRange.s + 
            (Math.round(Math.random()*((this.gaugeSettings.outerScaleRange.e - this.gaugeSettings.outerScaleRange.s) / 
            this.gaugeSettings.inputGranularity) * this.gaugeSettings.inputGranularity));
  }  // end calcTarget()
		
	toggleDemo():void {
    if (!this.isRunning) {
      this.isRunning = true;
      this.demoBtnLbl = "Stop Simulation";
      if (this.timeoutLen == 500) {
        this.timer = setInterval(()=>{this.runDemo();},100);
      }
    } else {
      this.isRunning = false;
      this.demoBtnLbl = "Start Simulation";
      clearInterval(this.timer);
      this.timeoutLen = 500;
    }
  }  // end toggleDemo()

	runDemo():void {
    this.demoStatusLbl = "Running demo..." + (this.timeoutLen + 1).toString();
    
    if (this.isRunning) {
      if (this.inputLevels.curr < this.inputLevels.targ) {
        this.inputLevels.curr += (this.gaugeSettings.outerScaleIntervals[1] * this.gaugeSettings.inputGranularity);
        if (this.inputLevels.curr > this.inputLevels.targ) this.inputLevels.curr = this.inputLevels.targ;
      }
      else if (this.inputLevels.curr > this.inputLevels.targ) {
        this.inputLevels.curr -= (this.gaugeSettings.outerScaleIntervals[1] * this.gaugeSettings.inputGranularity);
        if (this.inputLevels.curr < this.inputLevels.targ) this.inputLevels.curr = this.inputLevels.targ;
      }
      else {
        if (this.tick++ > this.delay) {
          this.tick = 0;
          this.delay = Math.round(Math.random()*30);
          this.inputLevels.targ = this.calcTarget();
        }
      }
    }
    this.gauge.setInputLevel(this.inputLevels.curr);
    this.gauge.drawScreen();

    if (this.timeoutLen-- < 0) {
      clearInterval(this.timer);
      this.isRunning = false;
      this.demoBtnLbl = "Start Simulation";
      this.timeoutLen = 500;
    }
  }  // end runDemo()

	resetSliderCtrl() {
		this.sliderCtrlValue = 0;
	}  // end resetSliderCtrl()
		
	onSliderInput():void {
    console.log('input');
    if (!this.isRunning) {
      var value = this.sliderCtrlValue;
      var pctage = value / 100;
      value = pctage * this.maxSteps;
      if (value < 0) {
        value = 0;
      } else if (value >= this.maxSteps) {
        value = this.maxSteps;
      } 
      // update gauge needle
      this.gauge.setInputLevel(value);
      this.gauge.drawScreen();
      // update canvas slider
      this.handleY = this.sliderY - (this.sliderHeight * pctage);
      this.drawSlider();
    }
  } // end onSliderInput()

  /*

		function setSettings() {
			gaugeSettings.inputGranularity = parseFloat(document.getElementById("inputGran").value);
			gaugeSettings.titleLine1 = document.getElementById("title1").value;
			gaugeSettings.titleLine2 = document.getElementById("title2").value;
			gaugeSettings.titleFont = document.getElementById("titleFont").value;
			gaugeSettings.gaugeDiam = parseInt(document.getElementById("gaugeDiam").value, 10);
			gaugeSettings.rimWidth = parseInt(document.getElementById("rimWidth").value, 10);
			gaugeSettings.faceColor = document.getElementById("faceColor").value;
			gaugeSettings.centerX = parseInt(document.getElementById("centerX").value, 10);
			gaugeSettings.centerY = parseInt(document.getElementById("centerY").value, 10);
			gaugeSettings.startDegree = parseInt(document.getElementById("startDegree").value, 10);
			gaugeSettings.endDegree = parseInt(document.getElementById("endDegree").value, 10);
			gaugeSettings.outerScaleDiam = parseInt(document.getElementById("outerScaleDiam").value, 10);
			gaugeSettings.outerScaleRange.s = parseInt(document.getElementById("outerScaleRangeLo").value, 10);
			gaugeSettings.outerScaleRange.e = parseInt(document.getElementById("outerScaleRangeHi").value, 10);
			gaugeSettings.outerScaleIntervals[0] = parseInt(document.getElementById("outerScaleIntervals1").value, 10);
			gaugeSettings.outerScaleIntervals[1] = parseInt(document.getElementById("outerScaleIntervals2").value, 10);
			gaugeSettings.outerScaleFnt = document.getElementById("outerScaleFnt").value;
			gaugeSettings.outerScaleColor = document.getElementById("outerScaleColor").value;
			gaugeSettings.outerScaleUnit = document.getElementById("outerScaleUnit").value;
			gaugeSettings.hasInnerScale = parseBoolean(document.getElementById("hasInnerScale").value);
			gaugeSettings.innerScaleConvFactor = parseFloat(document.getElementById("innerScaleConvFactor").value);
			console.log(gaugeSettings.innerScaleConvFactor);
			gaugeSettings.innerScaleDiam = parseInt(document.getElementById("innerScaleDiam").value, 10);
			gaugeSettings.innerScaleStartLabel = parseInt(document.getElementById("innerScaleStartLabel").value, 10);
			gaugeSettings.innerScaleIntervals[0] = parseInt(document.getElementById("innerScaleIntervals1").value, 10);
			gaugeSettings.innerScaleIntervals[1] = parseInt(document.getElementById("innerScaleIntervals2").value, 10);
			gaugeSettings.innerScaleFnt = document.getElementById("innerScaleFnt").value;
			gaugeSettings.innerScaleColor = document.getElementById("innerScaleColor").value;
			gaugeSettings.innerScaleUnit = document.getElementById("innerScaleUnit").value;
			gaugeSettings.innerScaleToEnd = parseBoolean(document.getElementById("innerScaleToEnd").value);
			gaugeSettings.dialBaseDiam = parseInt(document.getElementById("dialBaseDiam").value, 10);
			gaugeSettings.pointerColor = document.getElementById("pointerColor").value;
			gaugeSettings.digWd = parseInt(document.getElementById("digWd").value, 10);
			gaugeSettings.digHt = parseInt(document.getElementById("digHt").value, 10);
			gaugeSettings.digFnt = document.getElementById("digFnt").value;
			gaugeSettings.digBC = document.getElementById("digBC").value;
		}

		function parseBoolean(str) {
			if (str.toLowerCase() === "true") return true;
			return false;
		}
    */

	} // end runDemo()

/*
	// apply settings
	onApply(e:Event):void {
    setSettings();  // read settings from form into gaugeSettings object
    gauge.updateSettings(gaugeSettings);  // update Gauge object with settings object
    inputLevels.curr = gaugeSettings.outerScaleRange.s;  // reset current input to starting level
    gauge.setInputLevel(inputLevels.curr);  // update the gauge so needle is reset
    gauge.drawScreen();  // draw gauge
    setSliderValues();  // update the canvas slider variables so they match new settings
    drawSlider();  // redraw canvas slider
    resetSliderCtrl();  // reset the html slider control
    e.preventDefault(); // prevent default HTTP request on submit
  }

	// reset input fields
	onReset(e:Event):void {
    resetSettings();
    gauge.drawScreen();
    setSliderValues();
    drawSlider();
    resetSliderCtrl();
    e.preventDefault();
  }
*/

