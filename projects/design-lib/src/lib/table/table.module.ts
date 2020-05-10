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

@NgModule({
  declarations: [
    TableComponent,
    TableCellComponent,
    CellDirective,
    //CellComponent,
    //CellService,
    TextCellComponent
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

  ],
  exports: [TableComponent],
  providers: [
    CellService
  ],
  entryComponents: [
    TextCellComponent
  ]
})
export class TableModule {
  constructor(private cellService: CellService) {
    cellService.registerCell('string', TextCellComponent);
  }
}
