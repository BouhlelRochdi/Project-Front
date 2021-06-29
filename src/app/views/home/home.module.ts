import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { EventDetailComponent } from './components/event-detail/event-detail.component';
import { ReservationComponent } from './components/reservation/reservation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';


@NgModule({
  declarations: [
    HomeComponent,
    EventDetailComponent,
    ReservationComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class HomeModule { }
