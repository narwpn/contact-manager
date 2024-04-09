import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './services/in-memory-data.service';
import { EmployeeTableComponent } from './components/employee-table/employee-table.component';
import { AddEmployeeModalComponent } from './components/add-employee-modal/add-employee-modal.component';
import { EditEmployeeModalComponent } from './components/edit-employee-modal/edit-employee-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeTableComponent,
    AddEmployeeModalComponent,
    EditEmployeeModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
      dataEncapsulation: false,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
