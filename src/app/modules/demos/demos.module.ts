import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DemoTableComponent } from './demo-table/demo-table.component';
import { CustomTableCellComponent } from './custom-table-cell/custom-table-cell.component';
import { SimpleTableComponent } from './simple-table/simple-table.component';

import { TableModule } from '../../../../projects/design-lib/src/lib/table/table.module';

@NgModule({
  declarations: [
    SimpleTableComponent,
    DemoTableComponent,
    CustomTableCellComponent
  ],
  exports: [
    SimpleTableComponent,
    DemoTableComponent,
    CustomTableCellComponent
  ],
  imports: [
    CommonModule,
    TableModule
  ]
})
export class DemosModule { }
