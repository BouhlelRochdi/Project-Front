import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor() { }

  addCompany(data){
    console.log(data);
  }
}
