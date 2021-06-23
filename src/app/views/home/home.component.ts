import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../services/events.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  events : [];

  constructor(private eventService : EventsService) { }

  ngOnInit(): void {
    this.getEvents();
  }

  getEvents(){
    this.eventService.getAllEvents().subscribe(res =>{
      this.events= res;
    },
    err =>{
      console.log(err);
    })
  }

}
