import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsComponent } from './events.component';
import { UpdateEventComponent } from './update-event/update-event.component';

const routes: Routes = [{ path: '', component: EventsComponent,
data: {
  title: 'Events'
} },
{
  path: 'update/:id',
  component: UpdateEventComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule { }
