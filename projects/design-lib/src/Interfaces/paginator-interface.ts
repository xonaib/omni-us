/**
 * Change event object that is emitted when the user selects a
 * different page size or navigates to another page.
 */
export class PageEvent {
    /** The current page index. */
    pageIndex: number;

    /**
     * Index of the page that was selected previously.
     * @breaking-change 8.0.0 To be made into a required property.
     */
    previousPageIndex?: number;

    /** The current page size */
    pageSize: number;

    /** The current total number of items being paged */
    length: number;

    /** The Start Index for the item to take from array */
    startItemIndex: number;

    /** The End Index for the item to take */
    endItemIndex: number;
}
