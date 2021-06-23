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
  photoUploaded: File = null;
  photoUrl: any;
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
  }

  onFileSelect(event) {
    if (event.target.files.length == 0) {
      this.toasterService.pop('error', 'Photo Errors', 'Please select an image file')
      return;
    }
    else {
      this.photoUploaded = (event.target as HTMLInputElement).files[0];
      const allowedExtensionFile = ['image/jpg', 'image/jpeg', 'image/png'];
      if (!allowedExtensionFile.includes(this.photoUploaded.type)) {
        this.toasterService.pop('error', 'Photo Errors', 'Only those extension are acceptable! [jpg, jpeg, png]')
        return;
      }
      else {
        const readFile = new FileReader();
        readFile.readAsDataURL(this.photoUploaded);
        readFile.onload = (event) => {
          this.photoUrl = readFile.result;
        }
      }
    }
  }

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