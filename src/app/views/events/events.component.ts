import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule} from '@angular/forms';
import { IOption } from 'ng-select';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { NgbModal, NgbDate, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { DataTableService, TableData } from '../tables/datatable/datatable.service';
import { EventsService } from '../../services/events.service';
import { ToasterService } from 'angular2-toaster';
import { ActivatedRoute, Router } from '@angular/router';
// import { TableData, DataTableService } from '../tables/datatable/datatable.service';
// import swal from 'sweetalert';


@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  providers: [ DataTableService ],
  encapsulation: ViewEncapsulation.None,
  styleUrls: []
})
export class EventsComponent implements OnInit {
  @ViewChild('myModal') public myModal: ModalDirective;
  eventsForm: FormGroup;
  submited = false;
  events : [];
  // timeStart = {hour: 10, minute: 30};
  // timeEnd = {hour: 17, minute: 15};
  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate | null;
  toDate: NgbDate | null;


  public type: Array<IOption> = [
    {label: 'Free', value: 'free'},
    {label: 'Paid', value: 'Paid'},
  ];
  

  constructor(private modalService: NgbModal, private http: HttpClient,
     private eventService: EventsService,
     private toasterService: ToasterService,
     private router: Router,
     private activatedRoute:ActivatedRoute) {
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
    // this.id = this.activatedRoute.snapshot.params.id;
    this.getAllEvents();

  }

  AddEvent() {
    this.submited = true;
    if(this.eventsForm.invalid){
      return;
    }
    else{
      this.eventService.AddEvent(this.eventsForm.value)
      .subscribe(res => {
        this.toasterService.pop('success', 'Events has been Add', res);
        this.eventsForm.reset();
        this.myModal.hide();
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


  openLg(content) {
    this.modalService.open(content, { size: 'lg', centered: true, scrollable : true });
  }

  deleteEvent(id){
    this.eventService.deleteEvent(id)
    .subscribe( res => {
      this.toasterService.pop('success', 'this Event was deleted');
      this.getAllEvents();
    },
    err =>{
      this.toasterService.pop('error', 'Something went wrong!', err)
    })
    
  }

}
