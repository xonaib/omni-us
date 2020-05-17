import { Component, Input, OnInit } from '@angular/core';
import { CellComponent } from './cell.component';
import { ColumnDef, CellType } from '../../../../Interfaces/table-interface';

@Component({
    selector: 'lib-date-cell',
    template: '{{ row[column.columnDef] | date:dateFormat  }}'
})
export class DateCellComponent implements CellComponent, OnInit {
    @Input() column: ColumnDef;
    @Input() row: object;

    dateFormat = 'short';

    ngOnInit() {
        if (this.column.cellType === CellType.date) {
            this.dateFormat = 'shortDate';
        } else if (this.column.cellType === CellType.time) {
            this.dateFormat = 'shortTime';
        } else if (this.column.cellType === CellType.dateTime) {
            this.dateFormat = 'short';
        }
    }
}