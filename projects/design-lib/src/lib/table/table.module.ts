import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule, MatTableModule } from '@angular/material';
import { MatSortModule } from '@angular/material/sort';


@NgModule({
  declarations: [TableComponent],
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
  exports: [TableComponent]
})
export class TableModule { }
