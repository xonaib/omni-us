import { Component, OnInit, AfterContentInit, OnDestroy, Input, ViewChild, ContentChildren, ViewChildren, QueryList } from '@angular/core';

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
import { takeUntil } from 'rxjs/operators';
import { MatTable, MatColumnDef, PageEvent } from '@angular/material';
import {
  FFColumnDef,
  TableSort,
  TableFilter,
  TableDataParams
} from 'projects/design-lib/src/Interfaces/table-interface';

import { DesignLibService } from '../../../Services/design-lib.service';

@Component({
  selector: 'lib-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent<T> implements OnInit, OnDestroy, AfterContentInit {

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

  pageEvent(event: PageEvent) {
    // this.page.emit(event);
    debugger;
  }

  /** for checkbox selection */
  selection = new SelectionModel<T>(true, []);

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.selection.select(...this.data);
    //this.data.forEach(row => this.selection.select(row));
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
  checkboxLabel<T>(row?: T): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    // return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
    return `1`;
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

    this.populateTableColumns();

    this._observeRenderChanges();

    // this._observerSelectionChanges();

    // this._observerSortChanges();

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
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}
