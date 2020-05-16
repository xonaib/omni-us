import { Component, OnInit, AfterContentInit, OnDestroy, Input, ViewChild, ContentChildren, ViewChildren, QueryList, EventEmitter, Output } from '@angular/core';

//import { coerceNumberProperty } from '../../../Utils/Coercion/number-property';
//import { isArray, isArrayEmpty } from '../../../Utils/Coercion/array-property';
import { coerceNumberProperty } from '@angular/cdk/coercion';
import { isArray, isArrayEmpty } from '../../../Utils/array-property';

import { isDataSource, SelectionModel } from '@angular/cdk/collections';

import {
  Observable,
  isObservable,
  of as observableOf,
  Subscription,
  Subject,
  BehaviorSubject
} from 'rxjs';
import { takeUntil, debounceTime } from 'rxjs/operators';
import { MatTable, MatColumnDef, PageEvent, Sort } from '@angular/material';
import {
  FFColumnDef,
  TableSort,
  TableFilter,
  TableDataParams,
  TableEventType,
  TableConfig
} from 'projects/design-lib/src/Interfaces/table-interface';

import { DesignLibService } from '../../../Services/design-lib.service';
import { PaginationComponent } from '../../pagination/pagination/pagination.component';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'lib-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent<T> implements OnInit, OnDestroy, AfterContentInit {

  @ViewChild(PaginationComponent, { static: true }) pagination: PaginationComponent;

  @Input()
  get dataSource(): T[] | Observable<T[]> { return this._dataSource; }
  set dataSource(value: T[] | Observable<T[]>) {
    if (!this._isViewInit) {
      this._dataSource = value;
      return;
    }

    if (this._isViewInit && this._dataSource !== value) {
      this._switchDataSource(value);
    }
  }
  private _dataSource: T[] | Observable<T[]>;

  @Input()
  get tableConfig(): TableConfig { return this._tableConfig; }
  set tableConfig(value: TableConfig) {
    this._tableConfig = value;
  }
  private _tableConfig: TableConfig;

  // tslint:disable-next-line: no-inferrable-types
  private _isViewInit: boolean = false;

  /** latest data provided by data source */
  @Input()
  get data(): T[] { return this._data; }
  set data(value: T[]) {
    if (!isArray(value)) {
      return;
    }

    this._data = value;
  }
  private _data: T[];

  @Input()
  get tableColumns(): FFColumnDef[] { return this._colsDef; }
  set tableColumns(value: FFColumnDef[]) {
    if (!isArray(value)) {
      return;
    }

    this._colsDef = value;
  }
  private _colsDef: FFColumnDef[] = [];

  get headers(): string[] { return this._headers; }
  private _headers: string[];

  /** Subject that emits when the component has been destroyed. */
  private _onDestroy = new Subject<void>();

  /** Subscription that listens for the data provided by the data source. */
  private _renderChangeSubscription: Subscription | null;

  @ViewChild(MatTable, { static: true }) table: MatTable<T>;
  @ContentChildren(MatColumnDef) columnDefs: QueryList<MatColumnDef>;
  @ViewChildren('someDiv') staticColumnDefs: QueryList<MatColumnDef>;

  private _columnDefsByName = new Map<string, FFColumnDef>();

  get columnsWithoutTemplate(): FFColumnDef[] { return this._columnsWithoutTemplate; }
  private _columnsWithoutTemplate: FFColumnDef[] = [];

  /** should show pagination */
  // tslint:disable-next-line: no-inferrable-types
  @Input() hasPagination: boolean = true;

  /** The length of the total number of items that are being paginated. Defaulted to 0. */
  @Input()
  get length(): number { return this._length; }
  set length(value: number) {
    const totalItems = Math.max(coerceNumberProperty(value, 0));
    this._length = totalItems;
  }
  private _length = 0;

  /** Event emitted when the paginator changes the page size or page index. */
  @Output() readonly page: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();

  /** Event emitted when the paginator changes the page size or page index. */
  @Output('table') readonly tableEvents: EventEmitter<TableDataParams> = new EventEmitter<TableDataParams>();

  private _tableParams: TableDataParams;
  private _columnFilters: Map<string, TableFilter> = new Map<string, TableFilter>();

  searchInput: FormControl;
  searchCtrlSub: Subscription;

  listenSearchInput(): void {
    this.searchInput = new FormControl('');

    this.searchCtrlSub = this.searchInput.valueChanges.pipe(debounceTime(500))
      .subscribe((query: string) => {
        this._tableParams.search = query;
        this._tableParams.eventType = TableEventType.search;

        this.emitTableChanges();
        console.log('query', query);
      });
  }

  pageEvent(event: PageEvent) {
    // this._paginationData = event;
    // this.page.emit(event);

    this._tableParams.pageNumber = event.pageIndex;
    this._tableParams.pageSize = event.pageSize;
    this._tableParams.eventType = TableEventType.pagination;

    this.emitTableChanges();
  }

  /** Sort Change on header */
  sortChange(sort: Sort) {

    this._tableParams.sort = [{
      field: sort.active,
      method: sort.direction
    }];

    this._tableParams.eventType = TableEventType.sort;
    this.emitTableChanges();
  }

  columnFilterApply(filter: TableFilter): void {

    debugger;
    const anyFilterUpdated = this.updateFilters(filter);

    if (anyFilterUpdated) {
      this._tableParams.filter = Array.from(this._columnFilters.values());

      this._tableParams.eventType = TableEventType.columnFilter;
      this.emitTableChanges();
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
  }

  updateFilters(filter: TableFilter): boolean {
    let isFilterApplied = false;

    // if already set, then update
    // else if not being cancelled, and not already set, then add
    if (this._columnFilters.has(filter.field)) {
      isFilterApplied = true;

      // if being removed, then delete from list
      // else, update filter entry
      if (filter.isCancelled) {
        this._columnFilters.delete(filter.field);
      } else {
        this._columnFilters.set(filter.field, filter);
      }

    } else if (!filter.isCancelled) {
      isFilterApplied = true;

      this._columnFilters.set(filter.field, filter);
    }

    return isFilterApplied;
  }

  emitTableChanges(): void {
    this.tableEvents.emit(this._tableParams);
  }

  /** for checkbox selection */
  selection = new SelectionModel<T>(true, []);

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.selection.select(...this.data);
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    if (!this.data || isArrayEmpty(this.data)) {
      return;
    }

    const numSelected = this.selection.selected.length;
    const numRows = this.data.length;
    return numSelected === numRows;
  }
  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: T): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    // return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
    return `1`;
  }

  templateFor: string;
  onFilterClick(templateFor: string) {

    this.templateFor = templateFor;
  }

  showfilters(event): void {
    var elems = document.querySelectorAll("th .filters");
    [].forEach.call(elems, function (el) {
      if (el != event.target) {
        el.classList.remove("show-filter");
      }
    });
    event.target.classList.toggle('show-filter');
  }



  constructor() { }

  private _switchDataSource(value: T[] | Observable<T[]>) {
    this._data = [];

    if (isDataSource(this.dataSource)) {
      // this.dataSource.disconnect(this);
    }

    // Stop listening for data from the previous data source.
    if (this._renderChangeSubscription) {
      this._renderChangeSubscription.unsubscribe();
      this._renderChangeSubscription = null;
    }

    this._dataSource = value;

    if (!this.table) {
      return;
    }

    this._observeRenderChanges();
  }

  ngOnInit() {
   
  }

  ngAfterContentInit() {
    if (!this.table) {
      return;
    }
    this._isViewInit = true;

    let defaultPageSize = 10;

    if (this.tableConfig && this.tableConfig.paginationOptions && this.tableConfig.paginationOptions.defaultPageSize) {
      defaultPageSize = this.tableConfig.paginationOptions.defaultPageSize;
    }

    this._tableParams = {
      pageNumber: 0,
      pageSize: defaultPageSize,
      cursor: 0,
      search: '',
      sort: [],
      filter: []
    };

    this.populateTableColumns();

    this._observeRenderChanges();

    this.listenSearchInput();
  }

  /** Set up a subscription for the data provided by the data source. */
  private _observeRenderChanges(): void {

    if (!this.dataSource) {
      return;
    }

    let dataStream: Observable<T[] | ReadonlyArray<T>> | undefined;

    if (isDataSource(this.dataSource)) {
      // dataStream = this.dataSource.connect(this);
    } else if (isObservable(this.dataSource)) {
      dataStream = this.dataSource;
    } else if (Array.isArray(this.dataSource)) {
      dataStream = observableOf(this.dataSource);
    }

    if (dataStream === undefined) {

      // return
    }

    this._renderChangeSubscription = dataStream.pipe(takeUntil(this._onDestroy)).subscribe((data: T[]) => {

      this._data = data || [];
    });
  }

  populateTableColumns(): void {

    // reset stuff
    this._columnDefsByName.clear();
    this._headers = [];

    // for each column definition, add to our headers
    // this.columnDefs has the templates passed as ng-content
    // find the difference between colsDef for column's whose template were not provided
    this._colsDef.forEach((col: FFColumnDef) => {

      // push to headers
      // preserves ordering
      this._headers.push(col.columnDef);
      // set in map
      this._columnDefsByName.set(col.columnDef, col);

      // find if template has been provided for this column
      const templateColumn: MatColumnDef = this.columnDefs.find(f => f.name === col.columnDef);

      // when not found, then
      if (templateColumn == null && col.columnDef !== 'select') {
        this._columnsWithoutTemplate.push(col);
      }
    });

    // push column templates that have been provided
    this.columnDefs.forEach((columnDef: MatColumnDef) => {
      this.table.addColumnDef(columnDef);

      //const headerColumn : MatSort = {};
      //this.sort.register(columnDef);
    });
    //debugger;
    // this.sort.register()
    // this.componentSort
  }

  ngOnDestroy() {
    if (this.searchCtrlSub != null) {
      this.searchCtrlSub.unsubscribe();
    }

    this._onDestroy.next();
    this._onDestroy.complete();
  }
}
