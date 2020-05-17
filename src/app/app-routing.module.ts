import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DemoTableComponent } from './modules/demos/demo-table/demo-table.component';

const routes: Routes = [
  /*{
    path: 'pagination',
    loadChildren: () => import('./demo-pagination/demo-pagination.module').then(m => m.DemoPaginationModule)
  },*/
  {
    path: 'demo-table',
    component: DemoTableComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
