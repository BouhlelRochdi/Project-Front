import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IOption } from 'ng-select';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { DataTableService, TableData } from '../tables/datatable/datatable.service';
import { EventsService } from '../../services/events.service';
import { ToasterService } from 'angular2-toaster';
// import { TableData, DataTableService } from '../tables/datatable/datatable.service';


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


  public type: Array<IOption> = [
    {label: 'Free', value: 'free'},
    {label: 'Paid', value: 'Paid'},
  ];
  

  constructor(private modalService: NgbModal, private http: HttpClient,
     private eventService: EventsService,
     private toasterService: ToasterService) {
    
   }

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
    });

    this.getAllEvents();

  }

  AddEvent() {
    this.submited = true;
    if(this.eventsForm.invalid){
      return;
    }
    else{
      this.eventService.AddEvent(this.eventsForm.value).subscribe(res => {
        this.toasterService.pop('success', 'Events has been Add', res);
      }, err => {
        console.log(err);
        
      })      
    }
  }

  getAllEvents (){
    this.eventService.getAllEvents().subscribe(res =>{
      this.events = res;
    },
    err => {console.log(err)}
    );
  }


  openLg(content) {
    this.modalService.open(content, { size: 'lg', centered: true, scrollable : true });
  }

}
