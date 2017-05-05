import { Directive, AfterViewInit } from '@angular/core';
declare var componentHandler: any;

@Directive({
  selector: '[mdl]'
})
export class MdlUppgradeElementDirective {

  constructor() { }
  ngAfterViewInit() {
    componentHandler.upgradeAllRegistered();
  }
}
