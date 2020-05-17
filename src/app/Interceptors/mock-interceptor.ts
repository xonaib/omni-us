import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of, timer } from 'rxjs';

import { TableSort, TableFilter, TableDataParams } from '../../../projects/design-lib/src/Interfaces/table-interface';
import { Book } from '../Interfaces/Book-interface';
import { books } from '../../assets/table-data';
import { isNumber, isArray } from 'util';
import { switchMap } from 'rxjs/operators';

import { STRING } from '../../../projects/design-lib/src/Utils/string-property';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
    constructor(private injector: Injector) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (request.url.includes('/api/update')) {
            const book: Book = request.body as Book;
            return this.updateTableRow(book);
        }

        const params: TableDataParams = request.body as TableDataParams;
        return this.getTableData(params);
    }

    updateTableRow(row: Book): Observable<HttpEvent<any>> {
        let response = false;
        let book = books.find(f => f.id === row.id);

        if (book != null) {
            book = row;
            response = true;
        }

        return timer(500).pipe(switchMap(() => of(new HttpResponse({ status: 200, body: response }))));
    }

    /** Returns searchable keys */
    getSearchableKeys(): string[] {

        const book = new Book();
        const keys: Array<string> = Object.keys(book).filter(m => m !== 'id').map(key => {
            return key;
        });
        return keys;
    }

    /** Send Mock Table data */
    getTableData(params: TableDataParams): Observable<HttpEvent<any>> {
        if (params.cursor) {
            const book: Book = this.getItemById(books, params.cursor, 'id');

            return timer(500).pipe(switchMap(() => of(new HttpResponse({ status: 200, body: [1, [book]] }))));

            // return of(new HttpResponse({ status: 200, body: book }));
        }

        let filteredResults: Book[] = [];
        filteredResults = this.filterItems(books, params.filter);

        const searchKeys = this.getSearchableKeys();
        filteredResults = this.searchInItems(filteredResults, params.search, searchKeys);

        const itemsCount = filteredResults.length;

        filteredResults = this.sortItems(filteredResults, params.sort);

        filteredResults = this.paginateItems(filteredResults, params.pageNumber, params.pageSize);

        return timer(500).pipe(switchMap(() => of(new HttpResponse({ status: 200, body: [itemsCount, filteredResults] }))));

    }

    paginateItems<T>(items: T[], pageNum: number, pageSize: number): T[] {
        if (items == null) {
            return null;
        }
        // since default pageNum = 0
        // e.g. if length = 35
        // if pageNum = 2, pageSize = 10, then return => 10,20
        // if pageNum = 4, pageSize = 10, then return => 31,35

        const startIndex = (pageNum) * pageSize;
        const endIndex = ((pageNum + 1) * pageSize);

        return items.slice(startIndex, endIndex);
    }

    sortItems<T>(items: T[], sorts: TableSort[]): T[] {

        if (items == null || sorts == null || sorts.length === 0) {
            return items;
        }

        sorts.forEach((sort: TableSort) => {
            // sort if direction is provided
            if (sort.method !== '') {
                const isAsc = sort.method === 'asc';

                items = items.sort((a, b) => this.compare(a[sort.field], b[sort.field], isAsc));
            }
        });


        //return items.sort((a, b) => (a[prop] > b[prop]) ? 1 : ((b[prop] > a[prop]) ? -1 : 0)); */

        return items;
    }
    compare(a: number | string, b: number | string, isAsc: boolean) {
        return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }

    filterItems<T>(items: T[], filters: TableFilter[]): T[] {
        if (filters == null || filters.length === 0) {
            return items;
        }
        let results = items;

        filters.forEach((filter: TableFilter) => {
            if (filter.method === 'equality') {

                const comparator = (filter.parameters as string).toLowerCase();

                // if filter parameter type is string, and is not empty
                if (typeof filter.parameters === 'string' && !STRING.isNullOrEmpty(comparator)) {

                    results = results.filter(f => (f[filter.field] as string).toLowerCase() === comparator);
                }

            } else if (filter.method === 'range') {
                if (isArray(filter.parameters) && filter.parameters.length === 2) {
                    const startValue = filter.parameters[0];
                    const endValue = filter.parameters[1];

                    // only filter if start and end values are provided'']


                    if (startValue !== 0 && endValue !== 0) {
                        results = results.filter(f => (f[filter.field] as number) >= startValue && (f[filter.field] as number) <= endValue);
                    }
                }
            }
        });

        return results;
    }

    getItemById<T>(items: T[], id: number | string, key: string): T {
        return items.find(f => f[key] === id);
    }

    searchInItems<T>(items: T[], query: string, keys: string[]): T[] {
        if (query == null || query.length === 0 || keys == null || keys.length === 0) {
            return items;
        }
        let result: T[] = [];
        query = query.toLowerCase();

        keys.forEach((key: string) => {

            const matches = items.filter(f => String(f[key]).toLowerCase().includes(query));

            if (isArray(matches) && matches.length > 0) {
                result = result.concat(...matches);
            }
        });

        return result;
    }
}
