import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../services/company.service';
import { EventsService } from '../../services/events.service';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  events : [];
  detailCompany;

  constructor(private eventService : EventsService,
    private companyService: CompanyService,
    private homeService : HomeService) { }

  ngOnInit(): void {
    this.getEvents();
  }

  getEvents(){
    this.homeService.getEvents().subscribe(res =>{
      this.events= res;
    },
    err =>{
      console.log(err.error.message);
    })
  }

  getCompany(index){
    this.companyService.getCurrentCompany(index).subscribe(res =>{
      const companyName = res.name;
      console.log(companyName);
      
      return companyName;
    },
    err =>{
      console.log(err);
    })
  }

}
