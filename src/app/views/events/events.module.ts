import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsRoutingModule } from './events-routing.module';
import { EventsComponent } from './events.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectModule } from 'ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UpdateEventComponent } from './update-event/update-event.component';
import { SearchPipe } from './pipes/search.pipe';
import { DataTableModule } from 'angular2-datatable';
import { ModalModule } from 'ngx-bootstrap/modal';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { ReservationComponent } from './reservation/reservation.component';


@NgModule({
  declarations: [
    EventsComponent,
    UpdateEventComponent,
    SearchPipe,
    EventDetailComponent,
    ReservationComponent
  ],
  imports: [
    CommonModule,
    EventsRoutingModule,
    ReactiveFormsModule,
    SelectModule,
    CommonModule,
    DataTableModule,
    FormsModule,
    NgbModule,
    ModalModule.forRoot()
  ]
})
export class EventsModule { }
