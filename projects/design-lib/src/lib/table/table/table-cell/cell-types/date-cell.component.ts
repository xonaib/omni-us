import { Component, Input, OnInit } from '@angular/core';
import { CellComponent } from './cell.component';
import { FFColumnDef, CellType } from '../../../../../Interfaces/table-interface';

@Component({
    selector: 'mdt-date-cell',
    template: '{{ row[column.columnDef] | date:dateFormat  }}'
})
export class DateCellComponent implements CellComponent {
    @Input() column: FFColumnDef;
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