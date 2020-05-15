import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule, MatTableModule } from '@angular/material';
import { MatSortModule } from '@angular/material/sort';


import { TableComponent } from './table/table.component';
import { TableCellComponent } from './table/table-cell/cell.component';
import { CellDirective } from './table/table-cell/cell.directive';
//import { CellComponent } from './table/table-cell/cell-types/cell.component';
import { CellService } from './table/table-cell/cell-types/cell.service';
import { TextCellComponent } from './table/table-cell/cell-types/text-cell.component';
import { CurrencyCellComponent } from './table/table-cell/cell-types/currency-cell.component';
import { DateCellComponent } from './table/table-cell/cell-types/date-cell.component';

import { CellType } from '../../Interfaces/table-interface';
// import { OmniTableComponent } from './omni-table/omni-table.component';

import { PaginationModule } from '../pagination/pagination.module';
import { TableWrapperComponent } from './table-wrapper/table-wrapper.component';
import { ColumnFilterComponent } from './column-filter/column-filter.component';
//import { TestComponent } from './test/test.component'

@NgModule({
  declarations: [
    TableComponent,
    TableCellComponent,
    CellDirective,
    //CellComponent,
    //CellService,
    TextCellComponent,
    DateCellComponent,
    CurrencyCellComponent,
    //TestComponent,
    //OmniTableComponent,
    TableWrapperComponent,
    ColumnFilterComponent
  ],
  imports: [
    CommonModule,
    MatCheckboxModule,

    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatSortModule,
    MatTableModule,
    PaginationModule
  ],
  exports: [
    TableComponent,
    //TestComponent
    //OmniTableComponent
    TableWrapperComponent,
  ],
  providers: [
    CellService
  ],
  entryComponents: [
    TextCellComponent,
    DateCellComponent,
    CurrencyCellComponent
  ]
})
export class TableModule {
  constructor(private cellService: CellService) {
    cellService.registerCell(CellType.text, TextCellComponent);
    cellService.registerCell(CellType.date, DateCellComponent);
    cellService.registerCell(CellType.time, DateCellComponent);
    cellService.registerCell(CellType.dateTime, DateCellComponent);
    cellService.registerCell(CellType.currency, CurrencyCellComponent);

  }
}
