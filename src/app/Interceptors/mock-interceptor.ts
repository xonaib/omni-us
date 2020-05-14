import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of, timer } from 'rxjs';

import { TableSort, TableFilter, TableDataParams } from '../../../projects/design-lib/src/Interfaces/table-interface';
import { Book } from '../Interfaces/Book-interface';
import { books } from '../../assets/table-data';
import { isNumber, isArray } from 'util';
import { switchMap } from 'rxjs/operators';
//import 'rxjs/add/operator/delay';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
    constructor(private injector: Injector) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('Hollow interceptor' + request.url);

        const params: TableDataParams = request.body as TableDataParams;

        if (params.cursor) {
            const book: Book = this.getItemById(books, params.cursor, 'id');

            return timer(500).pipe(switchMap(() => { return of(new HttpResponse({ status: 200, body: [1, [book]] })) }));

            //return of(new HttpResponse({ status: 200, body: book }));
        }

        let filteredResults: Book[] = [];
        filteredResults = this.filterItems(books, params.filter);

        // to-do: map keys from interface
        const searchKeys = ['author', 'title', 'releaseDate', 'price', 'rating'];
        filteredResults = this.searchInItems(filteredResults, params.search, searchKeys);

        const itemsCount = filteredResults.length;

        filteredResults = this.sortItems(filteredResults, params.sort);

        filteredResults = this.paginateItems(filteredResults, params.pageNumber, params.pageSize);

        return timer(500).pipe(switchMap(() => { return of(new HttpResponse({ status: 200, body: [itemsCount, filteredResults] })) }));
        // return of(new HttpResponse({ status: 200, body: filteredResults }));
        // return of(new HttpResponse({ status: 200, body: (([1, 2, 3]) as any).default }));

        // return next.handle(request);
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

    sortItems<T>(items: T[], sort: TableSort[]): T[] {

        if (items == null || sort == null || sort.length === 0) {
            return items;
        }

        //return items.sort((a, b) => (a[prop] > b[prop]) ? 1 : ((b[prop] > a[prop]) ? -1 : 0)); */

        return items;
    }

    filterItems<T>(items: T[], filters: TableFilter[]): T[] {
        if (filters == null || filters.length === 0) {
            return items;
        }
        let results = items;

        filters.forEach((filter: TableFilter) => {
            if (filter.method === 'equality') {

                const comparator = Number(filter.parameters);
                if (typeof filter.parameters === 'string' && isNumber(comparator)) {

                    results = results.filter(f => (f[filter.field] as number) === comparator);
                }

            } else if (filter.method === 'range') {
                if (isArray(filter.parameters) && filter.parameters.length === 2) {
                    const startValue = filter.parameters[0];
                    const endValue = filter.parameters[1];

                    results = results.filter(f => (f[filter.field] as number) >= startValue && (f[filter.field] as number) <= endValue);
                }
            }
        });

        return null;
    }

    getItemById<T>(items: T[], id: number | string, key: string): T {
        return items.find(f => f[key] === id);
    }

    searchInItems<T>(items: T[], query: string, keys: string[]): T[] {
        if (query == null || query.length === 0 || keys == null || keys.length === 0) {
            return items;
        }
        let result: T[] = [];

        keys.forEach((key: string) => {
            const matches = items.filter(f => (f[key] as string).includes(query));

            result = result.concat(...matches);
        });

        return result;
    }
}
