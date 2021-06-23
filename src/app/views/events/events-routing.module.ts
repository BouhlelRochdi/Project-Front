import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { EventsComponent } from './events.component';
import { ReservationComponent } from './reservation/reservation.component';
import { UpdateEventComponent } from './update-event/update-event.component';

const routes: Routes = [{ path: '', component: EventsComponent,
data: {
  title: 'Events'
} },
{
  path: 'update/:id',
  component: UpdateEventComponent
},
{
  path: 'event-detail/:id',
  component: EventDetailComponent
},
{
  path : 'reservation/:id',
  component: ReservationComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule { }
