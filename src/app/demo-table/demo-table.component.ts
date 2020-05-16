import { Component, OnInit } from '@angular/core';

import { FFColumnDef, CurrencyOptions, CellType, TableConfig } from '../../../projects/design-lib/src/Interfaces/table-interface';
// import { PageEvent } from '../../../projects/design-lib/src/Interfaces/paginator-interface';
import {
  Observable,
  Subject,
  of as observableOf,
  timer
} from 'rxjs';
//import 'rxjs/add/observable/timer';

/*
interface Book {
  id: number;
  title: string;
  author: string;
  age: number;
  currency: number;
  date: Date;
  dateTime: Date;
  time: Date;
} */

@Component({
  selector: 'app-demo-table',
  templateUrl: './demo-table.component.html',
  styleUrls: ['./demo-table.component.scss']
})
export class DemoTableComponent implements OnInit {

  tableConfig: TableConfig = {
    isSearchable: true,
    isPaginated: true,
    showColumnsToggle: true,
    paginationOptions: {
      defaultPageSize: 25,
      pageSizeOptions: [5, 10, 25, 50, 100]
    }
  };

  columns: FFColumnDef[] = [
    {
      columnDef: 'select',
      header: 'Select',
    },
    {
      columnDef: 'title',
      header: 'Title',
      isSortable: true,
      hasColumnFilters: true,
    },

    {
      columnDef: 'author',
      isSortable: true,
      header: 'Author',
      hasColumnFilters: true,
    },
    {
      columnDef: 'price',
      isSortable: false,
      header: 'Price',
      cellType: CellType.currency,
      options: {
        unit: '$'
      }
    },
    {
      columnDef: 'releaseDate',
      isSortable: false,
      header: 'Date',
      cellType: CellType.date,
      isHidden: true
    },
    /*{
      columnDef: 'custom',
      isSortable: false,
      header: 'Custom',
      cellType: CellType.custom,
      options: {
        CustomComponent: 'CustomTableCellComponent'
      }
    },*/
  ];

  //dataSourceAll: Book[] = [];


  constructor() { }

  ngOnInit() {

  }


}
