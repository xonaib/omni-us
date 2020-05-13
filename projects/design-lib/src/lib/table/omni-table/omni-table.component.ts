import { Component, OnInit, Input, Output, AfterContentInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FFColumnDef } from 'projects/design-lib/src/Interfaces/table-interface';

//import { TableComponent } from '../table/table.component';
import { DesignLibService } from 'projects/design-lib/src/public-api';

@Component({
  selector: 'lib-omni-table',
  //templateUrl: '../table/table.component.html',
  templateUrl: './omni-table.component.html',
  styleUrls: ['./omni-table.component.scss'] //, '../table/table.component.scss'
})
export class OmniTableComponent<T>  implements OnInit, AfterContentInit  {

  @Input() dataSource: T[] | Observable<T[]>;

  @Input() columns: FFColumnDef[] = [];

  constructor(private libServce: DesignLibService) {
    //super();
  }

  ngOnInit() {
    //super.ngOnInit();
  }

  ngAfterContentInit(){
    //super.ngAfterContentInit();
  }
}
