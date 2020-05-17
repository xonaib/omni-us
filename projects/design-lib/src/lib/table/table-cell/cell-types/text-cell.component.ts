import { Component, Input } from '@angular/core';
import { CellComponent } from './cell.component';
import { ColumnDef } from '../../../../Interfaces/table-interface';

@Component({
    selector: 'lib-text-cell',
    template: '{{ row[column.columnDef] }}'
})
export class TextCellComponent implements CellComponent {
    @Input() column: ColumnDef;
    @Input() row: object;
}
