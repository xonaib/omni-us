import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableWrapperComponent } from './table-wrapper.component';
import { PaginationModule } from '../../pagination/pagination.module';
import { TableModule } from '../table.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CellType, TableConfig, ColumnDef } from 'projects/design-lib/src/Interfaces/table-interface';
import { OnInit, Component } from '@angular/core';
import { DesignLibService } from 'projects/design-lib/src/public-api';

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
        MatTableWithPaginatorApp,
      ],
      providers: [
        { provide: DesignLibService, useValue: new DesignLibService(null) }
      ]
    }).compileComponents();
  }));

  describe('with basic data source', () => {
    it('should create', () => {
      let fixture = TestBed.createComponent(MatTableWithPaginatorApp);

      expect(fixture).toBeTruthy();
    });

    it('should be able to create a table with the right number of columns', () => {
      let fixture = TestBed.createComponent(MatTableWithPaginatorApp);
      fixture.detectChanges();

      //const renderedColumns = fixture.nativeElement.querySelector('.mat-table thead tr').childElementCount;
      //expect(renderedColumns).toBeGreaterThan(0);

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

  /*describe('with paginated data app', () => {
    let fixture = TestBed.createComponent(MatTableWithPaginatorApp);

    it('should create', () => {
      expect(fixture).toBeTruthy();
    });

    fixture.detectChanges();
  }); */

});
export class Book {
  id: number;
  author: string;
  title: string;
  releaseDate: Date;
  price: number;
  rating: number;

  constructor() {
      this.id = 0;
      this.author = '';
      this.title = '';
      this.releaseDate = null;
      this.price = 0;
      this.rating = 0;
  }
}

@Component({
  template: `
     

`
})
class MatTableWithPaginatorApp implements OnInit {
  tableConfig: TableConfig = {
    isPaginated: true
  };
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

  }
}
