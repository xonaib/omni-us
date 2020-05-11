import { Component, OnInit } from '@angular/core';

import { FFColumnDef, CurrencyOptions, CellType } from '../../../projects/design-lib/src/Interfaces/table-interface';
import { PageEvent } from '../../../projects/design-lib/src/Interfaces/paginator-interface';
import {
  Observable,
  Subject,
  of as observableOf,
  timer
} from 'rxjs';
//import 'rxjs/add/observable/timer';


interface Book {
  id: number;
  title: string;
  author: string;
  age: number;
  currency: number;
  date: Date;
  dateTime: Date;
  time: Date;
}

@Component({
  selector: 'app-demo-table',
  templateUrl: './demo-table.component.html',
  styleUrls: ['./demo-table.component.scss']
})
export class DemoTableComponent implements OnInit {

  private _loading = new Subject<Book[]>();

  dataSource: Observable<Book[]>;

  columns: FFColumnDef[] = [
    {
      columnDef: 'title',
      header: 'Title',
    },
    {
      header: 'Age',
      columnDef: 'age',
      isSortable: true
    },
    {
      columnDef: 'author',
      isSortable: false,
      header: 'Author'
    },
    {
      columnDef: 'currency',
      isSortable: false,
      header: 'Currency',
      cellType: CellType.currency,
      options: {
        unit: '$'
      }
    },
    {
      columnDef: 'date',
      isSortable: false,
      header: 'Date',
      cellType: CellType.date
    },
    {
      columnDef: 'time',
      isSortable: false,
      header: 'Time',
      cellType: CellType.time,
    },
    {
      columnDef: 'dateTime',
      isSortable: false,
      header: 'Date Time',
      cellType: CellType.dateTime
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

  dataSourceAll: Book[] = [];
  length = 35;

  constructor() { }

  ngOnInit() {
    this.dataSourceAll = [];

    for (let i = 1; i < this.length; i++) { this.dataSourceAll.push(this.createNewBook(i)); }

    this.dataSource = this._loading.asObservable();

    const someBooks: Book[] = this.dataSourceAll.slice(0, 10);
    //this._loading.next(someBooks);
    timer(1200)
      .subscribe(s => {
        this._loading.next(someBooks);
      });
  }

  createNewBook(index: number): Book {
    const book: Book = {
      author: `author ${index}`,
      title: `title ${index}`,
      id: index,
      age: Math.round(Math.random() * 20),
      currency: Math.round(1000 + Math.random() * 2000),
      date: new Date(),
      time: new Date(),
      dateTime: new Date(),
    };

    return book;
  }
}
