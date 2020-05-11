import { Component, Input } from '@angular/core';
import { CellComponent } from './cell.component';
import { FFColumnDef } from '../../../../../Interfaces/table-interface';

@Component({
    selector: 'mdt-currency-cell',
    template: '{{ row[column.columnDef] | currency }}'
})
export class CurrencyCellComponent implements CellComponent {
    @Input() column: FFColumnDef;
    @Input() row: object;
}
