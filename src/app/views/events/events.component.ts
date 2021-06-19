import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms';
import { IOption } from 'ng-select';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { NgbModal, NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { DataTableService } from '../tables/datatable/datatable.service';
import { EventsService } from '../../services/events.service';
import { ToasterService } from 'angular2-toaster';
import { SweetAlertService } from '../../services/sweet-alert.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  providers: [ DataTableService ],
  encapsulation: ViewEncapsulation.None,
  styleUrls: []
})
export class EventsComponent implements OnInit {
  @ViewChild('eventModal') public eventModal: ModalDirective;
  eventsForm: FormGroup;
  submited = false;
  events : [];
  filterQuery : string = null;
  photoUploaded: File = null;
  photoUrl: any;
  // *****************************
  
   

  // *****************************
  public type: Array<IOption> = [
    {label: 'Free', value: 'free'},
    {label: 'Paid', value: 'Paid'},
  ];
  

  constructor(private modalService: NgbModal, private http: HttpClient,
     private eventService: EventsService,
     private toasterService: ToasterService,
     private sweetAlertService : SweetAlertService) {
   }

  ngOnInit(): void {
    this.eventsForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      startDate: new FormControl('2021-06-12T10:30', [Validators.required]),
      startTime: new FormControl('09:30', Validators.required),
      endDate: new FormControl('2021-06-16T17:30', Validators.required),
      endTime: new FormControl('17:30', Validators.required),
      photo: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      availableTicketNumber: new FormControl('', Validators.required),
      eventType: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required)
    });
    this.getAllEvents();
  }

  AddEvent() {
    this.submited = true;
    if(this.eventsForm.invalid){
      console.log('testtttt');
      
      return;
    }
    else{
      this.eventService.AddEvent(this.eventsForm.value)
      .subscribe(res => {
        this.toasterService.pop('success', 'Events has been Add', res);
        this.eventsForm.reset();
        this.eventModal.hide();
        this.getAllEvents();
      }, err => {
        this.toasterService.pop('error', 'There is something went wrong verify this error', err);
      })      
    }
  }

  getAllEvents (){
    this.eventService.getAllEvents().subscribe(res =>{
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

  deleteEvent(id){
    this.sweetAlertService.confirm().then((res) => {
      if (res.isConfirmed) {
        this.eventService.deleteEvent(id)
        .subscribe( res => {
          this.toasterService.pop('success', 'This Event was deleted');
          this.getAllEvents();
        },
        err =>{
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

  // ************************************
  }