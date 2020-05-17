import { Component, Input } from '@angular/core';
import { CellComponent } from './cell.component';
import { FFColumnDef } from '../../../../Interfaces/table-interface';

@Component({
    selector: 'lib-text-cell',
    template: '{{ row[column.columnDef] }}'
})
export class TextCellComponent implements CellComponent {
    @Input() column: FFColumnDef;
    @Input() row: object;
}
