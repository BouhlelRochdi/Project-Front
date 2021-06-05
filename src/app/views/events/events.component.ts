import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  eventsForm: FormGroup;
  submited = false;

  constructor() { }

  ngOnInit(): void {
    this.eventsForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      startDate: new FormControl('', [Validators.required]),
      startTime: new FormControl('', Validators.required),
      endDate: new FormControl('', Validators.required),
      endTime: new FormControl('', Validators.required),
      photo: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      availableTicketNumber: new FormControl('', Validators.required),
      eventType: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required)
    })
  }

  sendEvent() {
    console.log('events works!');
    console.log(this.eventsForm.value);
  }

}
