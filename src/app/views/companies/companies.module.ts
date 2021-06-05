import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompaniesRoutingModule } from './companies-routing.module';
import { CompaniesComponent } from './companies.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CompaniesComponent
  ],
  imports: [
    CommonModule,
    CompaniesRoutingModule,
    ReactiveFormsModule
  ]
})
export class CompaniesModule { }
