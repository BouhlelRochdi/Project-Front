import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventDetailComponent } from './components/event-detail/event-detail.component';
import { ReservationComponent } from './components/reservation/reservation.component';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'event-detail/:id',
    component: EventDetailComponent
  },
  {
    path: 'reservation/:id/:nbOfTicket',
    component: ReservationComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
