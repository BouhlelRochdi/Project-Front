import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompaniesRoutingModule } from './companies-routing.module';
import { CompaniesComponent } from './companies.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UpdateCompanyComponent } from './update-company/update-company.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SelectModule } from 'ng-select';
import { DataTableModule } from 'angular2-datatable';


@NgModule({
  declarations: [
    CompaniesComponent,
    UpdateCompanyComponent
  ],
  imports: [
    CommonModule,
    CompaniesRoutingModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    SelectModule,
    DataTableModule
  ]
})
export class CompaniesModule { }
