import { Component, OnInit, Input } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { FFColumnDef, TableSort, TableFilter } from 'projects/design-lib/src/Interfaces/table-interface';

import { DesignLibService } from '../../../Services/design-lib.service';

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

    this.fetchDataFromAPI();
  }

  fetchDataFromAPI(): void {
    const pageSize = 10;
    const pageNumber = 1;
    const cursor = 0;
    const search = '';
    const sort: TableSort[] = [];
    const filter: TableFilter[] = [];

    this.service.getTableData<T>(pageSize, pageNumber, cursor, search, sort, filter)
      .subscribe((dt: T[]) => {
        debugger;
        this._loading.next(dt);
      });
  }
}
