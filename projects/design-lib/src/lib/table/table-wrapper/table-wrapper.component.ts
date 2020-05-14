import { Component, OnInit, Input } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { FFColumnDef, TableSort, TableFilter, TableDataParams } from 'projects/design-lib/src/Interfaces/table-interface';

import { DesignLibService } from '../../../Services/design-lib.service';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'lib-table-wrapper',
  templateUrl: './table-wrapper.component.html',
  styleUrls: ['./table-wrapper.component.scss']
})
export class TableWrapperComponent<T> implements OnInit {

  // @Input() dataSource: T[] | Observable<T[]>;
  @Input() data: T[];
  @Input() tableColumns: FFColumnDef[];
  // tslint:disable-next-line: no-inferrable-types
  @Input() hasPagination: boolean = true;
  @Input() length: number;

  constructor(private service: DesignLibService) { }

  private _loading = new Subject<T[]>();

  dataSource: Observable<T[]>;

  ngOnInit() {
    this.dataSource = this._loading.asObservable();

    const params: TableDataParams = {
      pageNumber: 0,
      pageSize: 10,
      cursor: 0,
      search: '',
      sort: [],
      filter: []
    };
    this.fetchDataFromAPI(params);
  }

  pageEvent(event: PageEvent) {
    debugger;

    const params: TableDataParams = {
      pageNumber: event.pageIndex,
      pageSize: event.pageSize,
      cursor: 0,
      search: '',
      sort: [],
      filter: []
    };

    this.fetchDataFromAPI(params);
  }
  fetchDataFromAPI(params: TableDataParams): void {

    this.service.getTableData<T>(params.pageSize, params.pageNumber, params.cursor, params.search, params.sort, params.filter)
      .subscribe((dt: [number, T[]]) => {

        this.length = dt[0];
        this._loading.next(dt[1]);
      });
  }
}
