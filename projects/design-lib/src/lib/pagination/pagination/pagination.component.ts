import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  ChangeDetectorRef
} from '@angular/core';

//import { PageEvent } from '../../../Interfaces/paginator-interface';

import { FormControl } from '@angular/forms';

//import 'rxjs/add/operator/debounceTime';
//import 'rxjs/add/operator/distinctUntilChanged';
import { Subscription } from 'rxjs';

import { coerceNumberProperty } from '@angular/cdk/coercion';
import { PageEvent } from '@angular/material';

/** The default page size if there is no page size and there are no provided page size options. */
const DEFAULT_PAGE_SIZE = 50;

@Component({
  selector: 'lib-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent implements OnInit {
  /** Event emitted when the paginator changes the page size or page index. */
  @Output() readonly page: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();

  /** Show input box for directly goint to a page. By default set to true. */
  // tslint:disable-next-line: no-inferrable-types
  @Input() showGotoPage = true;

  /** The length of the total number of items that are being paginated. Defaulted to 0. */
  @Input()
  get length(): number { return this._length; }
  set length(value: number) {
    // reset length
    const totalItems = Math.max(coerceNumberProperty(value, 0));
    this._length = totalItems;

    // reset other page stuff as well
    this.renderPagination();
  }
  private _length = 0;
  /** The zero-based page index of the displayed list of items. Defaulted to 0. */
  // tslint:disable-next-line: no-inferrable-types
  @Input() pageIndex: number = 0;

  /** Number of items to display on a page. By default set to 50. */
  @Input()
  get pageSize(): number { return this._pageSize; }
  set pageSize(value: number) {

    this._pageSize = Math.max(coerceNumberProperty(value), 10);
    this._updateDisplayedPageSizeOptions();

    this.updateTotalPagesLabel();
  }
  // tslint:disable-next-line: no-inferrable-types
  private _pageSize: number = 50;

  // tslint:disable-next-line: no-inferrable-types
  @Input() showPageSizeOptions: boolean = true;

  /** The set of provided page size options to display to the user. */
  @Input()
  get pageSizeOptions(): number[] { return this._pageSizeOptions; }
  set pageSizeOptions(value: number[]) {
    this._pageSizeOptions = (value || []).map(p => coerceNumberProperty(p));
    this._updateDisplayedPageSizeOptions();
  }
  private _pageSizeOptions: number[] = [10, 50, 100, 250, 500];

  /** Returns total number of pages  */
  get totalPages(): number { return this._totalPages; }
  // tslint:disable-next-line: no-inferrable-types
  private _totalPages: number = 0;

  /** Displayed set of page size options. Will be sorted and include current page size. */
  _displayedPageSizeOptions: number[];

  // tslint:disable-next-line: no-inferrable-types
  _initialized: boolean = false;

  // tslint:disable-next-line: no-inferrable-types
  @Input() disabled: boolean = false;

  pageNumInput: FormControl;

  formCtrlSub: Subscription;

  // tslint:disable-next-line: no-inferrable-types
  rangeLabel: string = '';

  /** A label for the range of items within the current page and the length of the whole list. */
  getRangeLabel = (page: number, pageSize: number, length: number) => {
    console.log('go to range label');
    if (length === 0 || pageSize === 0) { return `0 of ${length}`; }

    length = Math.max(length, 0);

    const startIndex = page * pageSize;

    // If the start index exceeds the list length, do not try and fix the end index to the end.
    const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) :
      startIndex + pageSize;

    return `${startIndex + 1} – ${endIndex} of ${length}`;
  }

  /** Reset things  */
  renderPagination(): void {
    this.pageIndex = 0;
    this.updatePageRangeLabel();

    this.updateTotalPagesLabel();

    this.updatePageNumber();
  }

  /** Update Page Number Label */
  updatePageNumber(): void {
    if (this.pageNumInput != null) {
      this.pageNumInput.patchValue((this.pageIndex + 1), { emitEvent: false });
    }
  }

  /**
   * Updates the list of page size options to display to the user. Includes making sure that
   * the page size is an option and that the list is sorted.
   */
  private _updateDisplayedPageSizeOptions() {
    if (!this._initialized) { return; }

    // If no page size is provided, use the first page size option or the default page size.
    if (!this.pageSize) {
      this._pageSize = this.pageSizeOptions.length !== 0 ?
        this.pageSizeOptions[0] :
        DEFAULT_PAGE_SIZE;
    }

    this._displayedPageSizeOptions = this.pageSizeOptions.slice();

    if (this._displayedPageSizeOptions.indexOf(this.pageSize) === -1) {
      this._displayedPageSizeOptions.push(this.pageSize);
    }

    // Sort the numbers using a number-specific sort function.
    this._displayedPageSizeOptions.sort((a, b) => a - b);
    this._changeDetectorRef.markForCheck();

  }

  /**
   * Current page needs to be updated to reflect the new page size. Navigate to the page
   * containing the previous page's first item.
   * @param pageSize pageSize to change to
   */
  changePageSize(pageSize: number): void {
    const startIndex = this.pageIndex * this._pageSize;
    const previousPageIndex = this.pageIndex;

    this.pageIndex = Math.floor(startIndex / pageSize) || 0;
    this.pageSize = pageSize;

    this._emitPageEvent(previousPageIndex);
  }

  /** Checks whether the buttons for going forwards should be disabled. */
  _nextButtonsDisabled() {
    return this.disabled || !this.hasNextPage();
  }

  /** Checks whether the buttons for going backwards should be disabled. */
  _previousButtonsDisabled() {
    return this.disabled || !this.hasPreviousPage();
  }

  /** Whether there is a previous page. */
  hasPreviousPage(): boolean {
    return this.pageIndex >= 1 && this.pageSize !== 0;
  }
  /** Whether there is a next page. */
  hasNextPage(): boolean {
    const maxPageIndex = this.getNumberOfPages() - 1;
    return this.pageIndex < maxPageIndex && this.pageSize !== 0;
  }

  /** Advances to the next page if it exists. */
  nextPage(): void {
    if (!this.hasNextPage()) { return; }

    const previousPageIndex = this.pageIndex;
    this.pageIndex++;
    this._emitPageEvent(previousPageIndex);

    this.updatePageNumber();
  }

  /** Move back to the previous page if it exists. */
  previousPage(): void {
    if (!this.hasPreviousPage()) { return; }

    const previousPageIndex = this.pageIndex;
    this.pageIndex--;
    this._emitPageEvent(previousPageIndex);

    this.updatePageNumber();
  }

  /** Move to the first page if not already there. */
  firstPage(): void {
    // hasPreviousPage being false implies at the start
    if (!this.hasPreviousPage()) { return; }

    const previousPageIndex = this.pageIndex;
    this.pageIndex = 0;
    this._emitPageEvent(previousPageIndex);

    this.updatePageNumber();
  }

  /** Move to the last page if not already there. */
  lastPage(): void {
    // hasNextPage being false implies at the end
    if (!this.hasNextPage()) { return; }

    const previousPageIndex = this.pageIndex;
    this.pageIndex = this.getNumberOfPages() - 1;
    this._emitPageEvent(previousPageIndex);

    this.updatePageNumber();
  }

  /** Go to specific page */
  gotoPage(pageNum: number): void {
    // if specified page is greater than number of pages
    // then we cannot do anything
    if (pageNum > this.getNumberOfPages() || pageNum < 1) {
      return;
    }

    const previousPageIndex = this.pageIndex;
    this.pageIndex = pageNum - 1;
    this._emitPageEvent(previousPageIndex);
  }
  /** Calculate the number of pages */
  getNumberOfPages(): number {
    if (!this.pageSize) {
      return 0;
    }

    return Math.ceil(this.length / this.pageSize);
  }

  /** Page range label */
  updatePageRangeLabel(): void {
    const rangeLabel: string = this.getRangeLabel(this.pageIndex, this.pageSize, this.length);

    this.rangeLabel = rangeLabel;
  }

  /** update total number of pages label */
  updateTotalPagesLabel(): void {
    this._totalPages = this.getNumberOfPages();
  }

  /** Emits an event notifying that a change of the paginator's properties has been triggered. */
  private _emitPageEvent(previousPageIndex: number) {
    this.updatePageRangeLabel();

    // const [startIndex, endIndex] = this.getPageIndexsForPageNumber(this.pageIndex, this.pageSize, this.length);

    this.page.emit({
      previousPageIndex,
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
      length: this.length,
      // startItemIndex: startIndex,
      // endItemIndex: endIndex
    });
  }

  /**
   * Returns indexes of items that should be sliced from the data array,
   * since our demo project is using splice, which excludes the last element
   * we are adding the last element in our range
   * @param pageIndex PageIndex, is always 1 less than pageNumber
   * @param pageSize Size of page
   * @param length Length of items
   */
  getPageIndexsForPageNumber(pageIndex: number, pageSize: number, length: number): number[] {
    // since default pageNum = 0
    // e.g. if length = 35
    // if pageNum = 2, pageSize = 10, then return => 10,20
    // if pageNum = 4, pageSize = 10, then return => 31,35

    const startIndex = (pageIndex) * pageSize;
    const endIndex = ((pageIndex + 1) * pageSize);

    if (endIndex > length) {
    }

    return [startIndex, endIndex];
  }

  /** Listener for  */
  listenPageNumInput(): void {
    this.pageNumInput = new FormControl({ value: 0, disabled: this.disabled });

    /*this.formCtrlSub = this.pageNumInput.valueChanges
      .debounceTime(500)
      .subscribe((query: string) => {

        const feedbackValue = -1;
        const pageNum = coerceNumberProperty(query, feedbackValue);
        // if unable to convert to number
        if (pageNum === feedbackValue) {
          return;
        }
        this.gotoPage(pageNum);
      }); */
  }

  constructor(private _changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
    this._initialized = true;
    this._updateDisplayedPageSizeOptions();
    this.listenPageNumInput();

  }

  ngOnDestroy() {
    if (this.formCtrlSub != null) {
      this.formCtrlSub.unsubscribe();
    }
  }
}
