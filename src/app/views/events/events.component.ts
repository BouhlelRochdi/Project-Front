import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IOption } from 'ng-select';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { EventsService } from '../../services/events.service';
import { ToasterService } from 'angular2-toaster';
import { SweetAlertService } from '../../services/sweet-alert.service';
import { TagsService } from '../../services/tags.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../../scss/vendors/bs-datepicker/bs-datepicker.scss',]
})
export class EventsComponent implements OnInit {
  @ViewChild('eventModal') public eventModal: ModalDirective;
  eventsForm: FormGroup;
  submited = false;
  events: [];
  filterQuery: string = null;
  photoUploaded: File = null;
  photoUrl: any;

  // ******* Date Picker zone *********
  minDate1: Date = new Date();
  minDate2: Date = new Date();
  
  // Time Picker 
  public hstep: number = 1;
  public mstep: number = 15;
  public ismeridian: boolean = true;
  public isEnabled: boolean = true;
  
  // ******* Ng-select typeEvent
  public type: Array<IOption> = [
    { label: 'Free', value: 'free' },
    { label: 'Paid', value: 'Paid' },
  ];

  // ******* ng-select Tags
  public tags: Array<IOption> = [];


  constructor(private eventService: EventsService,
    private toasterService: ToasterService,
    private sweetAlertService: SweetAlertService,
    private tagsService: TagsService) {

    // Date Rang
    
    //************ End Date Rang */
  }

  ngOnInit(): void {
    this.eventsForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      startDate: new FormControl(new Date(), [Validators.required]),
      startTime: new FormControl(new Date(), Validators.required),
      endDate: new FormControl(new Date(), Validators.required),
      endTime: new FormControl(new Date(), Validators.required),
      price: new FormControl('', Validators.required),
      availableTicketNumber: new FormControl('', Validators.required),
      eventType: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required),
      tags: new FormControl('')
    });
    this.getTags();
    this.getAllEvents();
    this.eventsForm.controls.startDate.valueChanges.subscribe(newStartDate =>{
      this.minDate2 = newStartDate;
    })
  }

  AddEvent() {
    this.submited = true;
    try {
      // if(this.eventsForm.invalid){
      //   console.log(this.eventsForm.invalid);
      //   return;
      // }
      // else{
      const formData = new FormData();
      const data = this.eventsForm.value;
      Object.keys(data).forEach(key => {
        formData.append(key, data[key]);
      });
      if (this.photoUploaded !== null) {
        formData.append('photo', this.photoUploaded, this.photoUploaded.name);
      }
      this.eventService.AddEvent(formData)
        .subscribe(res => {
          this.toasterService.pop('success', 'Events has been Add', res);
          this.eventsForm.reset();
          this.eventModal.hide();
          this.getAllEvents();
        }, err => {
          this.toasterService.pop('error', 'There is something went wrong verify this error', err);
        })

    } catch (err) {
      console.log(err);

    }
  }

  getAllEvents() {
    this.eventService.getAllEvents().subscribe(res => {
      this.events = res;
    },
      err => {
        this.toasterService.pop('error', 'There is something went wrong verify this error', err);
      }
    );
  }

  openLg() {
    this.eventModal.show();
  }

  deleteEvent(id) {
    this.sweetAlertService.confirm().then((res) => {
      if (res.isConfirmed) {
        this.eventService.deleteEvent(id)
          .subscribe(res => {
            this.toasterService.pop('success', 'This Event was deleted');
            this.getAllEvents();
          },
            err => {
              this.toasterService.pop('error', 'Something went wrong!', err)
            })
      }
    })
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
  // ************************************
  getTags() {
    this.tagsService.getAlltags().subscribe((res: any[]) => {
      this.tags = res.map((item) => {
        const newObject = {
          label: item.name,
          value: item._id
        };
        return newObject;
      });
    },
      err => {
        this.toasterService.pop('error', 'Error to get tags');
      })
  }
  // ************************************
}