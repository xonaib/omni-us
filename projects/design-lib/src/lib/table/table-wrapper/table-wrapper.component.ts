import { Component, OnInit, Input, OnDestroy, EventEmitter, Output } from '@angular/core';
import { Observable, Subject, observable, of } from 'rxjs';
import { ColumnDef, TableSort, TableFilter, TableDataParams, TableEventType, TableConfig } from 'projects/design-lib/src/Interfaces/table-interface';

import { DesignLibService } from '../../../Services/design-lib.service';
import { PageEvent } from '@angular/material';
import { catchError } from 'rxjs/operators';


/**
 * This is a wrapper around lib-table
 * This is more like a pass-through, the smart around the the dumb lib-table
 * 
 * While lib-table expects data,
 * This component is responsible for fetching data from our API
 * based on any table parameters such as search or table filters
 *
 * Being a wrapper, this could have been equally replaced by a directive as well. 
 */
@Component({
  selector: 'lib-table-wrapper',
  templateUrl: './table-wrapper.component.html',
  styleUrls: ['./table-wrapper.component.scss']
})
export class TableWrapperComponent<T> implements OnInit, OnDestroy {

  // @Input() dataSource: T[] | Observable<T[]>;
  @Input() data: T[];
  @Input() tableColumns: ColumnDef[];

  @Input() length: number;

  @Input() tableConfig: TableConfig;

  // Event Emitters for data
  @Output() readonly onDataLoadStarted: EventEmitter<void> = new EventEmitter<void>();
  @Output() readonly onDataLoadCompleted: EventEmitter<void> = new EventEmitter<void>();
  @Output() readonly onDataLoadFailed: EventEmitter<void> = new EventEmitter<void>();

  @Output() readonly onSearch: EventEmitter<void> = new EventEmitter<void>();
  @Output() readonly onFilters: EventEmitter<void> = new EventEmitter<void>();
  @Output() readonly onSort: EventEmitter<void> = new EventEmitter<void>();
  @Output() readonly onPagination: EventEmitter<void> = new EventEmitter<void>();


  constructor(private service: DesignLibService) { }

  private _loading = new Subject<T[]>();

  dataSource: Observable<T[]>;

  ngOnInit() {
    this.dataSource = this._loading.asObservable();

    let defaultPageSize = 10;
    if (this.tableConfig && this.tableConfig.paginationOptions && this.tableConfig.paginationOptions.defaultPageSize) {
      defaultPageSize = this.tableConfig.paginationOptions.defaultPageSize;
    }
    const params: TableDataParams = {
      pageNumber: 0,
      pageSize: defaultPageSize,
      cursor: 0,
      search: '',
      sort: [],
      filter: []
    };
    this.fetchDataFromAPI(params);
  }



  /** Emit change type events */
  emitChangeTypeEvent(params: TableDataParams): void {
    if (params.eventType === TableEventType.pagination) {
      this.onPagination.emit();
    } else if (params.eventType === TableEventType.columnFilter) {
      this.onFilters.emit();
    } else if (params.eventType === TableEventType.search) {
      this.onSearch.emit();
    } else if (params.eventType === TableEventType.sort) {
      this.onSort.emit();
    }
  }

  rowUpdated(row: T): void {
    this.sendRowUpdateRequest(row);
  }

  sendRowUpdateRequest(row: T) {
    this.service.updateTableRow<T>(row)
      .pipe(catchError(err => {
        return of(null);
      }))
      .subscribe((data: boolean) => {
        console.log('row updated');
      });
  }

  /** Listener for change type events */
  tableChanges(params: TableDataParams): void {
    this.emitChangeTypeEvent(params);

    this.fetchDataFromAPI(params);
  }

  fetchDataFromAPI(params: TableDataParams): void {
    this.onDataLoadStarted.emit();

    this.service.getTableData<T>(params.pageSize, params.pageNumber, params.cursor, params.search, params.sort, params.filter)
      .pipe(catchError(err => {

        this.onDataLoadFailed.emit();
        return of(null);
      }))
      .subscribe((dt: [number, T[]]) => {

        // data load failed
        if (dt == null) {
          this.onDataLoadFailed.emit();
          return;
        }

        // data loaded
        this.onDataLoadCompleted.emit();

        this.length = dt[0];
        this._loading.next(dt[1]);
      });
  }

  ngOnDestroy() {
    this._loading.next();
    this._loading.complete();
  }
}
