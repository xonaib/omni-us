import { Component, OnInit, Input, ViewChild, Output, EventEmitter, OnDestroy } from '@angular/core';
import { MatMenuTrigger } from '@angular/material';
import { TableFilter } from 'projects/design-lib/src/Interfaces/table-interface';



@Component({
  selector: 'lib-column-filter',
  templateUrl: './column-filter.component.html',
  styleUrls: ['./column-filter.component.scss']
})
export class ColumnFilterComponent implements OnInit, OnDestroy {

  @ViewChild('filterMenu', { static: true }) triggerMenu: MatMenuTrigger;

  @Input() field: string;

  @Output() readonly filterApply: EventEmitter<TableFilter> = new EventEmitter<TableFilter>();



  filter: TableFilter;

  constructor() { }

  ngOnInit() {
    this.filter = {
      field: this.field,
      method: 'equality',
      parameters: ''
    };
  }

  filterTypeChange(): void {
    debugger;

    if (this.filter.method === 'equality') {
      this.filter.parameters = '';
    } else {
      this.filter.parameters = [0, 0];
    }


  }

  applyFilter(): void {
    this.filterApply.emit(this.filter);
  }

  ngOnDestroy() {
    this.filterApply.next();
    this.filterApply.complete();
  }

}
