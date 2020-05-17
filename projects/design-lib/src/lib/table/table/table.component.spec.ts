import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableComponent } from './table.component';
import { PaginationModule } from '../../pagination/pagination.module';
import { Component, OnInit, OnDestroy, ViewChild, inject } from '@angular/core';
import { CellType, ColumnDef, TableConfig } from 'projects/design-lib/src/Interfaces/table-interface';
import { TableModule } from '../table.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Observable, Subject, timer } from 'rxjs';
import { DesignLibService } from 'projects/design-lib/src/Services/design-lib.service';
import { Book } from 'src/app/Interfaces/Book-interface';
/*
describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
*/


describe('TableComponent', () => {
  let service: DesignLibService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        PaginationModule,
        TableModule,
        NoopAnimationsModule
      ],
      declarations: [
        MatTableApp,
        MatTableWithPaginatorApp,
      ],
      providers: [
        { provide: DesignLibService, useValue: new DesignLibService(null) }
      ]
      /* providers: [
        TableComponent,
        { provide: DesignLibService, useClass: DesignLibService }
      ] */
    }).compileComponents();
  }));

  describe('with basic data source', () => {
    it('should create', () => {
      let fixture = TestBed.createComponent(MatTableApp);

      expect(fixture).toBeTruthy();
    });

    it('should be able to create a table with the right number of columns', () => {
      let fixture = TestBed.createComponent(MatTableApp);
      fixture.detectChanges();

      const renderedColumns = fixture.nativeElement.querySelector('.mat-table thead tr').childElementCount;
      expect(renderedColumns).toBeGreaterThan(0);

      // fixture.componentInstance.table.data = fixture.componentInstance.allDataSet;
      /*debugger;
      // expect(columns.length).toBe(renderedColumns);
      timer(2200)
      .subscribe(s => {
        fixture.detectChanges();
        
        const columns = fixture.componentInstance.columns;
        const renderedColumns = fixture.nativeElement.querySelector('.mat-table thead tr').childElementCount;

        debugger;
      }); */

    });
  });
});

export interface Book {
  id: number;
  author: string;
  title: string;
  releaseDate: Date;
  price: number;
  rating: number;
}

@Component({
  template: `
      <lib-table  [tableColumns]="columns" [hasPagination]="true"></lib-table>

`
})
class MatTableWithPaginatorApp implements OnInit {

  ngOnInit() {

  }
}
@Component({
  template: `<lib-table  [data]="allDataSet" [tableConfig]="tableConfig"></lib-table>`
})
class MatTableApp implements OnInit, OnDestroy {

  @ViewChild(TableComponent, { static: true }) table: TableComponent<Book>;

  private _loading = new Subject<Book[]>();

  tableConfig: TableConfig = {
    tableRowType: new Book()
  };
  dataSource: Observable<Book[]>;
  allDataSet: Book[] = [];

  columns: ColumnDef[] = [
    {
      columnDef: 'title',
      header: 'Title',
    },
    {
      columnDef: 'author',
      isSortable: false,
      header: 'Author'
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
      cellType: CellType.date
    },
  ];

  ngOnInit() {
    this.dataSource = this._loading.asObservable();

    //this.allDataSet = new Array(5);
    //this.allDataSet = this.allDataSet.map((v, i) => this.createNewBook(i));

    //this._loading.next(this.allDataSet);

    /*timer(100)
      .subscribe(s => {
        debugger;
        this._loading.next(this.allDataSet);
      }); */
  }

  createNewBook(index: number): Book {
    const book: Book = {
      author: `author ${index}`,
      title: `title ${index}`,
      id: index,
      price: Math.round(1000 + Math.random() * 2000),
      releaseDate: new Date(),
      rating: Math.round(1 + Math.random() * 5)
    };

    return book;
  }
  ngOnDestroy() {
    this._loading.next();
    this._loading.complete();
  }
}
