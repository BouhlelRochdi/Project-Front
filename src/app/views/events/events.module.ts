import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsRoutingModule } from './events-routing.module';
import { EventsComponent } from './events.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectModule } from 'ng-select';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UpdateEventComponent } from './update-event/update-event.component';
// import { DataTableComponent } from '../tables/datatable/datatable.component';
// import { DataFilterPipe } from '../tables/datatable/datafilterpipe';


@NgModule({
  declarations: [
    EventsComponent,
    UpdateEventComponent,
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
    FormsModule,
    NgbModule
    // HttpClientModule
  ]
})
export class EventsModule { }
