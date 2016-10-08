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
// Helper component to add dynamic components
var DclWrapper = (function () {
    function DclWrapper(componentFactoryResolver, compiler, cdRef) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.compiler = compiler;
        this.cdRef = cdRef;
        this.isViewInitialized = false;
    }
    DclWrapper.prototype.updateComponent = function () {
        if (!this.isViewInitialized) {
            return;
        }
        if (this.cmpRef) {
            // when the `type` input changes we destroy a previously 
            // created component before creating the new one
            this.cmpRef.destroy();
        }
        var factory = this.componentFactoryResolver.resolveComponentFactory(this.type);
        this.cmpRef = this.target.createComponent(factory);
        // to access the created instance use
        // this.compRef.instance.someProperty = 'someValue';
        // this.compRef.instance.someOutput.subscribe(val => doSomething());
    };
    DclWrapper.prototype.ngOnInit = function () {
        console.log("OnInit called from dcl");
        this.cdRef.detach(); // bug fix to prevent 'Expression has changed... exception
    };
    DclWrapper.prototype.ngOnChanges = function () {
        console.log("OnChange called from DclWrapper");
        this.updateComponent();
    };
    DclWrapper.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.isViewInitialized = true;
        this.updateComponent();
        console.log("AfterViewInit from dcl");
        setTimeout(function () { return _this.cdRef.reattach(); }, 0); // bug fix to prevent 'Expression has changed... exception
    };
    DclWrapper.prototype.ngOnDestroy = function () {
        if (this.cmpRef) {
            this.cmpRef.destroy();
        }
    };
    __decorate([
        core_1.ViewChild('target', { read: core_1.ViewContainerRef }), 
        __metadata('design:type', core_1.ViewContainerRef)
    ], DclWrapper.prototype, "target", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', core_1.Type)
    ], DclWrapper.prototype, "type", void 0);
    DclWrapper = __decorate([
        core_1.Component({
            selector: 'dcl-wrapper',
            template: "<div #target></div>"
        }), 
        __metadata('design:paramtypes', [core_1.ComponentFactoryResolver, core_1.Compiler, core_1.ChangeDetectorRef])
    ], DclWrapper);
    return DclWrapper;
}());
exports.DclWrapper = DclWrapper;
//# sourceMappingURL=dclwrapper.component.js.map