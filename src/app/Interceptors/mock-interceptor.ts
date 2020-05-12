import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TableSort, TableFilter, TableDataParams } from '../../../projects/design-lib/src/Interfaces/table-interface';
import { Book } from '../Interfaces/Book-interface';
import { books } from '../../assets/table-data';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
    constructor(private injector: Injector) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('Hollow interceptor' + request.url);

        debugger;
        const params: TableDataParams = request.body as TableDataParams;
        console.log(params);

        return of(new HttpResponse({ status: 200, body: books }));
        // return of(new HttpResponse({ status: 200, body: (([1, 2, 3]) as any).default }));

        // return next.handle(request);
    }
}
