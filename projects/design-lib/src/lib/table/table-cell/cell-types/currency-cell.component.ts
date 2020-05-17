import { Component, Input } from '@angular/core';
import { CellComponent } from './cell.component';
import { ColumnDef } from '../../../../Interfaces/table-interface';

@Component({
    selector: 'lib-currency-cell',
    template: '{{ row[column.columnDef] | currency }}'
})
export class CurrencyCellComponent implements CellComponent {
    @Input() column: ColumnDef;
    @Input() row: object;
}
