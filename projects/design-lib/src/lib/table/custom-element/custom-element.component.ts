import { Component, OnInit, Input } from '@angular/core';
import { ColumnDef } from 'projects/design-lib/src/Interfaces/table-interface';

@Component({
  selector: 'lib-custom-element',
  templateUrl: './custom-element.component.html',
  styleUrls: ['./custom-element.component.scss']
})
export class CustomElementComponent implements OnInit {

  @Input() column: ColumnDef;
  @Input() row: object;

  displayValue = '';

  constructor() { }

  ngOnInit() {
    this.displayValue = this.row[this.column.columnDef];
  }

}
