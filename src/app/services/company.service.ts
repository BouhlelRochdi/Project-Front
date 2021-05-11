import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor( private http : HttpClientModule) { }

  addCompany(data){
    // this.http.post(data);
    console.log(data);
  }
}
