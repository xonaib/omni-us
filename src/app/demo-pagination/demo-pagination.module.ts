import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoPaginationComponent } from './demo-pagination/demo-pagination.component';
import { PaginationModule } from '../../../projects/design-lib/src/lib/pagination/pagination.module';

import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule, MatSidenavModule, MatTableModule, MatInputModule } from '@angular/material';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { MatSortModule } from '@angular/material/sort';

const routes: Routes = [];

@NgModule({
  declarations: [DemoPaginationComponent],
  imports: [
    CommonModule,
    RouterModule,
    PaginationModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    RouterModule.forChild([
      {
        path: '',
        component: DemoPaginationComponent
      }
    ])
  ],
})

export class DemoPaginationModule { }
