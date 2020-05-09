import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './pagination/pagination.component';

import {MatSelectModule} from '@angular/material/select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule, MatIconModule, MatFormFieldModule} from '@angular/material';
import {MatTooltipModule} from '@angular/material/tooltip';


@NgModule({
  declarations: [PaginationComponent],
  imports: [
    CommonModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatTooltipModule
  ],
  exports: [PaginationComponent]
})
export class PaginationModule { }
