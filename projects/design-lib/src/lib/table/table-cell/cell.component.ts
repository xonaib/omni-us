import { Component, ComponentFactoryResolver, Input, ViewChild, OnInit } from '@angular/core';
import { CellDirective } from './cell.directive';
import { CellService } from './cell-types/cell.service';
import { CellComponent } from './cell-types/cell.component';
import { ColumnDef, CellType } from '../../../Interfaces/table-interface';

@Component({
    selector: 'lib-table-cell',
    template: '<ng-template libCellHost></ng-template>'
})
export class TableCellComponent implements OnInit {

    //@ViewChild(CellDirective) cellHost: CellDirective;
    @ViewChild(CellDirective, { static: true }) cellHost: CellDirective;

    @Input() row: object;
    @Input() column: ColumnDef;

    constructor(
        private cellService: CellService,
        private readonly componentFactoryResolver: ComponentFactoryResolver
    ) { }

    ngOnInit() {
        this.initCell();
    }
    initCell() {
        let cellComponent = null;

        if (this.column.cellType === CellType.custom && this.column.options) {
            cellComponent = this.column.options.CustomComponent;
        } else {
            cellComponent = this.cellService.getCell(this.column.cellType, this.column.options);
        }


        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(cellComponent);
        const viewContainerRef = this.cellHost.viewContainerRef;
        viewContainerRef.clear();
        const componentRef = viewContainerRef.createComponent(componentFactory);
        const cell = componentRef.instance as CellComponent;
        cell.row = this.row;
        cell.column = this.column;
    }
}