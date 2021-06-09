import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsRoutingModule } from './events-routing.module';
import { EventsComponent } from './events.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SelectModule } from 'ng-select';
// import { DataTableComponent } from '../tables/datatable/datatable.component';
// import { DataFilterPipe } from '../tables/datatable/datafilterpipe';


@NgModule({
  declarations: [
    EventsComponent,
    // DataTableComponent,
    // DataFilterPipe
  ],
  imports: [
    CommonModule,
    EventsRoutingModule,
    ReactiveFormsModule,
    SelectModule,
    // DatatableRoutingModule,
    CommonModule,
    // DataTableModule,
    // FormsModule,
    // HttpClientModule
  ]
})
export class EventsModule { }
