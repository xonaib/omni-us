import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableWrapperComponent } from './table-wrapper.component';
import { PaginationModule } from '../../pagination/pagination.module';
import { TableModule } from '../table.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CellType, TableConfig, ColumnDef } from 'projects/design-lib/src/Interfaces/table-interface';
import { OnInit, Component } from '@angular/core';
import { DesignLibService } from 'projects/design-lib/src/public-api';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';

describe('TableComponent', () => {
  let service: DesignLibService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        PaginationModule,
        TableModule,
        NoopAnimationsModule,
        HttpClientModule,
        // HttpClientTestingModule
      ],
      declarations: [
        MatTableWithPaginatorApp,
      ],
      providers: [
        { provide: DesignLibService, useValue: new DesignLibService(null) },
        //{ provide: HttpClient, useValue: HttpClient }
      ]
    }).compileComponents();
  }));

  describe('with basic data source', () => {
    it('should create', () => {
      let fixture = TestBed.createComponent(MatTableWithPaginatorApp);

      expect(fixture).toBeTruthy();
    });
  });
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
      <lib-table-wrapper  [tableColumns]="columns" [tableConfig]="tableConfig"></lib-table-wrapper>

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
