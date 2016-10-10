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
var GaugeDemoComponent = (function () {
    function GaugeDemoComponent() {
        this.rectW = 100;
        this.rectH = 100;
        this.rectColor = "#FF0000";
    }
    GaugeDemoComponent.prototype.ngAfterViewInit = function () {
        var canvas = this.myCanvas.nativeElement;
        this.context = canvas.getContext("2d");
        this.redraw();
    };
    GaugeDemoComponent.prototype.redraw = function () {
        var _this = this;
        requestAnimationFrame(function () {
            _this.redraw();
        });
        var ctx = this.context;
        ctx.clearRect(0, 0, 400, 400);
        ctx.fillStyle = this.rectColor;
        ctx.fillRect(0, 0, this.rectW, this.rectH);
    };
    __decorate([
        core_1.ViewChild("myCanvas"), 
        __metadata('design:type', Object)
    ], GaugeDemoComponent.prototype, "myCanvas", void 0);
    GaugeDemoComponent = __decorate([
        core_1.Component({
            selector: 'my-gauge-demo',
            template: "\n    <div class=\"container\">\n      <canvas #myCanvas width=\"200\" height=\"200\" style=\"background:lightgray;\">Your browser does not support HTML5 Canvas</canvas>\n      <div>Width <input type=\"range\" min=\"1\" max=\"200\" [(ngModel)]=\"rectW\" (change)=\"redraw()\"> </div>\n      <div>Height <input type=\"range\" min=\"1\" max=\"200\" [(ngModel)]=\"rectH\" (change)=\"redraw()\"> </div>\n      <div>Color <input type=\"color\" [(ngModel)]=\"rectColor\" placeholder=\"color\" value=\"{{rectColor}}\"> </div>\n    </div>",
            styles: ["\n    canvas {\n      border: solid 1px red;\n    }\n    .container {\n      width: 200px;\n    }\n  "]
        }), 
        __metadata('design:paramtypes', [])
    ], GaugeDemoComponent);
    return GaugeDemoComponent;
}());
exports.GaugeDemoComponent = GaugeDemoComponent;
//# sourceMappingURL=gauge-demo.component.js.map