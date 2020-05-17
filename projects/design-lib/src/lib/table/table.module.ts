import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule, MatTableModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { MatSortModule } from '@angular/material/sort';


import { TableComponent } from './table/table.component';
import { TableCellComponent } from './table-cell/cell.component';
import { CellDirective } from './table-cell/cell.directive';
import { CellService } from './table-cell/cell-types/cell.service';
import { TextCellComponent } from './table-cell/cell-types/text-cell.component';
import { CurrencyCellComponent } from './table-cell/cell-types/currency-cell.component';
import { DateCellComponent } from './table-cell/cell-types/date-cell.component';

import { CellType } from '../../Interfaces/table-interface';
// import { OmniTableComponent } from './omni-table/omni-table.component';

import { PaginationModule } from '../pagination/pagination.module';
import { TableWrapperComponent } from './table-wrapper/table-wrapper.component';
import { ColumnFilterComponent } from './column-filter/column-filter.component';
import { CustomElementComponent } from './custom-element/custom-element.component';
//import { TestComponent } from './test/test.component'

@NgModule({
  declarations: [
    TableComponent,
    TableCellComponent,
    CellDirective,
    TextCellComponent,
    DateCellComponent,
    CurrencyCellComponent,
    TableWrapperComponent,
    ColumnFilterComponent,
    CustomElementComponent
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
    PaginationModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [
    TableComponent,
    //TestComponent
    //OmniTableComponent
    TableWrapperComponent,
    CustomElementComponent
  ],
  providers: [
    CellService
  ],
  entryComponents: [
    TextCellComponent,
    DateCellComponent,
    CurrencyCellComponent,
    CustomElementComponent
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
