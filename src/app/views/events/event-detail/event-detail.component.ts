import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { EventsService } from '../../../services/events.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {
  id;
  result;

  constructor(private eventService: EventsService,
    private activedRouter : ActivatedRoute,
    private toaster : ToasterService) { }

  ngOnInit(): void {
    this.id = this.activedRouter.snapshot.params.id;
    this.eventService.getCurrentEvent(this.id).subscribe(res =>{
      this.toaster.pop('success', 'Here we go', res);
      console.log(res);
      
      this.result = res;  
    },
    err =>{
      console.log(err);   
    })
  }
  
  
}
