import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PaginationModule } from '../../projects/design-lib/src/lib/pagination/pagination.module';
import { TableModule } from '../../projects/design-lib/src/lib/table/table.module';

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
import { MatTabsModule } from '@angular/material/tabs';
// import { DemoTableComponent } from './demo-table/demo-table.component';
// import { CustomTableCellComponent } from './custom-table-cell/custom-table-cell.component';

import { HttpRequestInterceptor } from './Interceptors/mock-interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

import { DemosModule } from './modules/demos/demos.module';

// import { registerLocaleData } from '@angular/common'; 
// import localeFr from '@angular/common/locales/fr';

// registerLocaleData(localeFr , 'fr');

@NgModule({
  declarations: [
    AppComponent,
    // DemoTableComponent,
    // CustomTableCellComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    PaginationModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    TableModule,
    HttpClientModule,
    DemosModule,
    MatTabsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    //CustomTableCellComponent
  ]
})
export class AppModule { }
