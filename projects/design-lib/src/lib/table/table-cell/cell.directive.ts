import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[libCellHost]',
})
export class CellDirective {
    constructor(public viewContainerRef: ViewContainerRef) {}
}
