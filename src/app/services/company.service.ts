import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor( private http : HttpClient) { }

  addCompany(data): Observable<any>{
    return this.http.post('', data);
  }
}
