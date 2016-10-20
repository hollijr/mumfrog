"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var TankDemoComponent = (function () {
    function TankDemoComponent() {
    }
    // class variables
    TankDemoComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
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
        window.addEventListener('mouseup', function (evt) {
            _this.mousedown = false;
        });
    };
    TankDemoComponent.prototype.resetSettings = function () {
        this.gaugeSettings.inputGranularity = 1;
        this.gaugeSettings.titleLine1 = "ACCUMULATOR";
        this.gaugeSettings.titleLine2 = "PRESSURE";
        this.gaugeSettings.titleFont = "18pt Arial";
        this.gaugeSettings.gaugeDiam = 175;
        this.gaugeSettings.rimWidth = 25;
        this.gaugeSettings.faceColor = "#ffffff";
        this.gaugeSettings.centerX = 200;
        this.gaugeSettings.centerY = 250;
        this.gaugeSettings.startDegree = 135;
        this.gaugeSettings.endDegree = 405;
        this.gaugeSettings.outerScaleDiam = 100;
        this.gaugeSettings.outerScaleRange = { s: 0, e: 6000 };
        this.gaugeSettings.outerScaleIntervals = [500, 100, 0]; // not using third interval at present
        this.gaugeSettings.outerScaleFnt = "8pt Calibri";
        this.gaugeSettings.outerScaleColor = "#000000";
        this.gaugeSettings.outerScaleUnit = "PSI";
        this.gaugeSettings.hasInnerScale = true;
        this.gaugeSettings.innerScaleConvFactor = 0.068573;
        this.gaugeSettings.innerScaleDiam = 96;
        this.gaugeSettings.innerScaleMin = 0;
        this.gaugeSettings.innerScaleIntervals = [50, 10, 0];
        this.gaugeSettings.innerScaleFnt = "8pt Arial";
        this.gaugeSettings.innerScaleColor = "#ff0000";
        this.gaugeSettings.innerScaleUnit = "Kg/cm3";
        this.gaugeSettings.innerScaleToEnd = true;
        this.gaugeSettings.dialBaseDiam = 25;
        this.gaugeSettings.pointerColor = "#0000ff";
        this.gaugeSettings.digWd = 60;
        this.gaugeSettings.digHt = 14;
        this.gaugeSettings.digFnt = "12pt Calibri";
        this.gaugeSettings.digBC = "#efefef";
    };
    TankDemoComponent.prototype.setSliderValues = function () {
        this.maxSteps = this.gaugeSettings.outerScaleRange.e - this.gaugeSettings.outerScaleRange.s + 1;
        this.sliderHeight = this.canvasHt - 10; // initial slider height is 10 pixels less than canvas height
        this.sliderY = this.sliderHeight + 5; // (x,y) location of center base of slider
        this.handleY = this.sliderY; // handleY is current location of slider handle
        this.pxInterval = Math.floor(this.sliderHeight / this.maxSteps * this.gaugeSettings.outerScaleIntervals[1]);
    };
    TankDemoComponent.prototype.drawSlider = function () {
        this.ctx.rect(0, 0, this.canvasWd, this.canvasHt);
        this.ctx.clip();
        this.ctx.clearRect(0, 0, this.canvasWd, this.canvasHt);
        var y = this.sliderY;
        // draw slider tick marks			
        this.ctx.lineWidth = 1;
        for (var i = 0; i < this.maxSteps; i = i + this.gaugeSettings.outerScaleIntervals[1]) {
            this.drawLine(i, y);
            y -= this.pxInterval;
        }
        y += this.pxInterval;
        this.sliderHeight = this.sliderY - y; // adjust slider height to actual height based on pixel interval
        // draw vertical slider line
        this.ctx.strokeStyle = "#0000ff";
        this.ctx.lineWidth = 5;
        this.ctx.beginPath();
        this.ctx.moveTo(this.sliderX, this.sliderY);
        this.ctx.lineTo(this.sliderX, y);
        this.ctx.stroke();
        this.ctx.closePath();
        // draw slider handle
        this.ctx.fillStyle = "#000000";
        this.ctx.beginPath();
        this.ctx.arc(this.sliderX - this.handleHalfWd, this.handleY, this.handleHalfHt, (Math.PI / 180) * 90, (Math.PI / 180) * 270, false);
        this.ctx.lineTo(this.sliderX + this.handleHalfWd, this.handleY - this.handleHalfHt);
        this.ctx.arc(this.sliderX + this.handleHalfWd, this.handleY, this.handleHalfHt, (Math.PI / 180) * 270, (Math.PI / 180) * 450, false);
        this.ctx.lineTo(this.sliderX - this.handleHalfWd, this.handleY + this.handleHalfHt);
        this.ctx.fill();
        this.ctx.closePath();
    }; // end drawSlider()
    TankDemoComponent.prototype.drawLine = function (i, y) {
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
            this.ctx.fillStyle = "#0000ff";
            this.ctx.textBaseline = "middle";
            this.ctx.textAlign = "start";
            this.ctx.fillText(i.toString(), x2 + 8, y);
        }
    }; // end drawLine()
    TankDemoComponent.prototype.setMouseDown = function (isDown) {
        this.mousedown = isDown;
    }; // end setMouseDown()
    TankDemoComponent.prototype.onSliderMouseMove = function (evt) {
        if (this.mousedown) {
            var mousePos = this.getMousePos(this.sliderCanvas, evt);
            //var message = onHandle + " -- Mouse position: " + mousePos.x + "," + mousePos.y + " || " + mousePos.msg;
            //writeMessage(this, message);
            if (this.isOnSlider(mousePos) && !this.isRunning) {
                var value = (this.sliderY - mousePos.y) / this.sliderHeight * this.maxSteps;
                //console.log(value);
                if (value < 0) {
                    this.handleY = this.sliderY;
                }
                else if (value >= this.maxSteps) {
                    this.handleY = this.sliderY - this.sliderHeight;
                }
                else {
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
    }; // end onSliderMouseMove()
    TankDemoComponent.prototype.getMousePos = function (canvas, evt) {
        var rect = canvas.getBoundingClientRect(), root = document.documentElement;
        // return relative mouse position
        var mouseX = evt.clientX - rect.left - root.scrollLeft;
        var mouseY = evt.clientY - rect.top - root.scrollTop;
        var pos = { x: mouseX, y: mouseY, msg: "cx: " + evt.clientX + ", cy: " + evt.clientY + ", t: " + rect.top + ", l: " + rect.left + ", st:" + root.scrollTop + ", sl:" + root.scrollLeft };
        //console.log(pos);
        return pos;
    }; // end getMousePos()
    TankDemoComponent.prototype.isOnSlider = function (mousePos) {
        if (mousePos.x >= this.sliderX - this.handleHalfWd * 2 && mousePos.x <= this.sliderX + this.handleHalfWd * 2 &&
            mousePos.y >= this.sliderY - this.sliderHeight && mousePos.y <= this.sliderY) {
            return true;
        }
        return false;
    }; // end isOnSlider()
    TankDemoComponent.prototype.calcTarget = function () {
        return this.gaugeSettings.outerScaleRange.s +
            (Math.round(Math.random() * ((this.gaugeSettings.outerScaleRange.e - this.gaugeSettings.outerScaleRange.s) /
                this.gaugeSettings.inputGranularity) * this.gaugeSettings.inputGranularity));
    }; // end calcTarget()
    TankDemoComponent.prototype.toggleDemo = function () {
        var _this = this;
        if (!this.isRunning) {
            this.isRunning = true;
            this.demoBtnLbl = "Stop Simulation";
            if (this.timeoutLen == 500) {
                this.timer = setInterval(function () { _this.runDemo(); }, 100);
            }
        }
        else {
            this.isRunning = false;
            this.demoBtnLbl = "Start Simulation";
            clearInterval(this.timer);
            this.timeoutLen = 500;
        }
    }; // end toggleDemo()
    TankDemoComponent.prototype.runDemo = function () {
        this.demoStatusLbl = "Running demo..." + (this.timeoutLen + 1).toString();
        if (this.isRunning) {
            if (this.inputLevels.curr < this.inputLevels.targ) {
                this.inputLevels.curr += (this.gaugeSettings.outerScaleIntervals[1] * this.gaugeSettings.inputGranularity);
                if (this.inputLevels.curr > this.inputLevels.targ)
                    this.inputLevels.curr = this.inputLevels.targ;
            }
            else if (this.inputLevels.curr > this.inputLevels.targ) {
                this.inputLevels.curr -= (this.gaugeSettings.outerScaleIntervals[1] * this.gaugeSettings.inputGranularity);
                if (this.inputLevels.curr < this.inputLevels.targ)
                    this.inputLevels.curr = this.inputLevels.targ;
            }
            else {
                if (this.tick++ > this.delay) {
                    this.tick = 0;
                    this.delay = Math.round(Math.random() * 30);
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
    }; // end runDemo()
    TankDemoComponent.prototype.resetSliderCtrl = function () {
        this.sliderCtrlValue = 0;
    }; // end resetSliderCtrl()
    TankDemoComponent.prototype.onSliderInput = function () {
        console.log('input');
        if (!this.isRunning) {
            var value = this.sliderCtrlValue;
            var pctage = value / 100;
            value = pctage * this.maxSteps;
            if (value < 0) {
                value = 0;
            }
            else if (value >= this.maxSteps) {
                value = this.maxSteps;
            }
            // update gauge needle
            this.gauge.setInputLevel(value);
            this.gauge.drawScreen();
            // update canvas slider
            this.handleY = this.sliderY - (this.sliderHeight * pctage);
            this.drawSlider();
        }
    }; // end onSliderInput()
    TankDemoComponent.prototype.setSettings = function () {
        this.gaugeSettings.gaugeDiam = this.enforceInt(this.gaugeSettings.gaugeDiam);
        this.gaugeSettings.rimWidth = this.enforceInt(this.gaugeSettings.rimWidth);
        this.gaugeSettings.centerX = this.enforceInt(this.gaugeSettings.centerX);
        this.gaugeSettings.centerY = this.enforceInt(this.gaugeSettings.centerY);
        this.gaugeSettings.startDegree = this.enforceInt(this.gaugeSettings.startDegree);
        this.gaugeSettings.endDegree = this.enforceInt(this.gaugeSettings.endDegree);
        this.gaugeSettings.outerScaleDiam = this.enforceInt(this.gaugeSettings.outerScaleDiam);
        this.gaugeSettings.outerScaleRange.s = this.enforceInt(this.gaugeSettings.outerScaleRange.s);
        this.gaugeSettings.outerScaleRange.e = this.enforceInt(this.gaugeSettings.outerScaleRange.e);
        this.gaugeSettings.outerScaleIntervals[0] = this.enforceInt(this.gaugeSettings.outerScaleIntervals[0]);
        this.gaugeSettings.outerScaleIntervals[1] = this.enforceInt(this.gaugeSettings.outerScaleIntervals[1]);
        this.gaugeSettings.hasInnerScale = this.parseBoolean(this.gaugeSettings.hasInnerScale);
        this.gaugeSettings.innerScaleConvFactor = this.enforceFloat(this.gaugeSettings.innerScaleConvFactor);
        this.gaugeSettings.innerScaleDiam = this.enforceInt(this.gaugeSettings.innerScaleDiam);
        this.gaugeSettings.innerScaleMin = this.enforceInt(this.gaugeSettings.innerScaleMin);
        this.gaugeSettings.innerScaleIntervals[0] = this.enforceInt(this.gaugeSettings.innerScaleIntervals[0]);
        this.gaugeSettings.innerScaleIntervals[1] = this.enforceInt(this.gaugeSettings.innerScaleIntervals[1]);
        this.gaugeSettings.innerScaleToEnd = this.parseBoolean(this.gaugeSettings.innerScaleToEnd);
        this.gaugeSettings.dialBaseDiam = this.enforceInt(this.gaugeSettings.dialBaseDiam);
        this.gaugeSettings.digWd = this.enforceInt(this.gaugeSettings.digWd);
        this.gaugeSettings.digHt = this.enforceInt(this.gaugeSettings.digHt);
    }; // end setSettings()
    TankDemoComponent.prototype.parseBoolean = function (str) {
        str = str.toString().toLowerCase();
        if (str === "true")
            return true;
        return false;
    };
    TankDemoComponent.prototype.enforceInt = function (num) {
        return Math.floor(num);
    };
    TankDemoComponent.prototype.enforceFloat = function (num) {
        return num * 1.0;
    };
    // apply settings
    TankDemoComponent.prototype.onApply = function (e) {
        this.setSettings(); // read settings from form into gaugeSettings object
        this.update(e);
    };
    // reset input fields
    TankDemoComponent.prototype.onReset = function (e) {
        this.resetSettings();
        this.update(e);
    };
    TankDemoComponent.prototype.update = function (e) {
        this.gauge.updateSettings(this.gaugeSettings); // update Gauge object with settings object
        this.inputLevels.curr = this.gaugeSettings.outerScaleRange.s; // reset current input to starting level
        this.gauge.setInputLevel(this.inputLevels.curr); // update the gauge so needle is reset
        this.gauge.drawScreen(); // draw gauge
        this.setSliderValues(); // update the canvas slider variables so they match new settings
        this.drawSlider(); // redraw canvas slider
        this.resetSliderCtrl(); // reset the html slider control
        e.preventDefault(); // prevent default HTTP request on submit
    };
    __decorate([
        core_1.ViewChild("gaugeCanvas"), 
        __metadata('design:type', Object)
    ], TankDemoComponent.prototype, "gaugeCanvas", void 0);
    __decorate([
        core_1.ViewChild("sliderCanvas"), 
        __metadata('design:type', Object)
    ], TankDemoComponent.prototype, "sliderCanvas", void 0);
    TankDemoComponent = __decorate([
        core_1.Component({
            selector: 'my-gauge-demo',
            templateUrl: 'app/gauge-demo.component.html',
            styleUrls: ['app/gauge-demo.component.css']
        }), 
        __metadata('design:paramtypes', [])
    ], TankDemoComponent);
    return TankDemoComponent;
}());
exports.TankDemoComponent = TankDemoComponent; // end class
//# sourceMappingURL=tank-demo.component.js.map