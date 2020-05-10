import { Component, ComponentFactoryResolver, Input, ViewChild, OnInit } from '@angular/core';
import { CellDirective } from './cell.directive';
import { CellService } from './cell-types/cell.service';
import { CellComponent } from './cell-types/cell.component';
import { FFColumnDef } from '../../../../Interfaces/table-interface';

@Component({
    selector: 'mdt-table-cell',
    template: '<ng-template mdtCellHost></ng-template>'
})
export class TableCellComponent implements OnInit {

    //@ViewChild(CellDirective) cellHost: CellDirective;
    @ViewChild(CellDirective, { static: true }) cellHost: CellDirective;

    @Input() row: object;
    @Input() column: FFColumnDef;

    constructor(
        private cellService: CellService,
        private readonly componentFactoryResolver: ComponentFactoryResolver
    ) { }

    ngOnInit() {
        this.initCell();
    }
    initCell() {
        const cellComponent = this.cellService.getCell(this.column.cellType);
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(cellComponent);
        const viewContainerRef = this.cellHost.viewContainerRef;
        viewContainerRef.clear();
        const componentRef = viewContainerRef.createComponent(componentFactory);
        const cell = componentRef.instance as CellComponent;
        cell.row = this.row;
        cell.column = this.column;
    }
}