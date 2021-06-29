import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HomeService } from '../../../../services/home.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {
  id;
  result;

  constructor(private homeService: HomeService,
    private activedRouter : ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.activedRouter.snapshot.params.id;
    this.homeService.getOneEvent(this.id).subscribe(res =>{
      this.result = res;     
    },
    err =>{
      console.log(err.error.message);   
    })
  }
  
  
}
