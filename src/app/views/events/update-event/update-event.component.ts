import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { IOption } from 'ng-select';
import { EventsService } from '../../../services/events.service';

@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html',
  styleUrls: ['./update-event.component.css']
})
export class UpdateEventComponent implements OnInit {
  updateEvent: FormGroup;
  submited = false;
  id;
  events : [];
  public type: Array<IOption> = [
    {label: 'Free', value: 'free'},
    {label: 'Paid', value: 'Paid'},
  ];


  constructor(private eventService: EventsService,
    private toasterService: ToasterService, 
    private activedRouter:ActivatedRoute, 
    private router:Router) { }
    

  ngOnInit(): void {
    this.updateEvent = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      startDate: new FormControl('', [Validators.required]),
      startTime: new FormControl({hour: 10, minute: 30}, Validators.required),
      endDate: new FormControl('', Validators.required),
      endTime: new FormControl({hour: 10, minute: 30}, Validators.required),
      photo: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      availableTicketNumber: new FormControl('', Validators.required),
      eventType: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required)
    });
    this.id = this.activedRouter.snapshot.params.id;
    this.getCurrentEvent(this.id);
    // const formData = new FormData();
    // formData.append('file', this.updateEvent.get('profile').value);
  }

  // onFileSelect(event) {
  //   if (event.target.files.length > 0) {
  //     const file = event.target.files[0];
  //     this.updateEvent.get('photo').setValue(file);
  //   }
  // }

  update(){  
    this.submited = true;
    if(this.updateEvent.invalid){
      return;
    }
    else{
      this.eventService.updateEventService(this.updateEvent, this.id)
      .subscribe(res => {
        this.toasterService.pop('success', 'Events has been updated', res);
      }, err => {
        this.toasterService.pop('error', 'Something goes wrong!', err);        
      })      
    } 
  }

  getCurrentEvent(id){
    this.eventService.getCurrentEvent(id)
    .subscribe(res => {
      this.updateEvent.patchValue(res);
    },
    err => {
      this.toasterService.pop('error', 'Something goes wrong!');
    })
  }

  


}
