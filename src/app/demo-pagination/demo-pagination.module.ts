import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoPaginationComponent } from './demo-pagination/demo-pagination.component';
import { PaginationModule } from '../../../projects/design-lib/src/lib/pagination/pagination.module';

import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [];

@NgModule({
  declarations: [DemoPaginationComponent],
  imports: [
    CommonModule,
    RouterModule,
    PaginationModule,
    RouterModule.forChild([
      {
        path: '',
        component: DemoPaginationComponent
      }
    ])
  ],
})

export class DemoPaginationModule { }
