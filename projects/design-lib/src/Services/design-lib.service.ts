import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { TableSort, TableFilter, TableDataParams } from '../Interfaces/table-interface';

@Injectable({
  providedIn: 'root'
})
export class DesignLibService {

  searchUrl = '/api/endpoint';

  public httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  });

  constructor(private http: HttpClient) { }

  getXyz(query: string): Observable<any> {
    debugger;
    return this.http.get<any>(`${this.searchUrl}/?value=${query}`).pipe(
      catchError(err => of([]))
    );
  }




  /**
   * Returns List Of Data to show in table
   * @param pageSize Page Size
   * @param pageNumber Page Number
   * @param cursor Primary Key
   * @param search Any value within the full dataset
   * @param sort List of sort of any field, and method can be ascending or descending
   * @param filter List of filters of any field,
   */
  getTableData<T>(
    pageSize: number, pageNumber: number, cursor: number, search: string,
    sort: TableSort[], filter: TableFilter[]): Observable<[number, T[]]> {

    type T1 = [number, T[]];

    const options = {
      headers: this.httpHeaders
    };

    const params: TableDataParams = {
      pageSize,
      pageNumber,
      cursor,
      search,
      sort,
      filter
    };


    return this.http.post<T1>(`${this.searchUrl}`, params, options).pipe(
      // catchError(err => of([0, []]))
      // catchError(err => of())
    );

    /*return this.http.post<T[]>(`${this.searchUrl}`, params, options).pipe(
      catchError(err => of([]))
    ); */
  }
}
