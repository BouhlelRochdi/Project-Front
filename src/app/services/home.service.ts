import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  getEvents(): Observable <any>{
    return this.http.get(`http://localhost:3000/api/all-events`);
  }

  getOneEvent(id): Observable <any>{
    return this.http.get(`http://localhost:3000/api/event-details/${id}`);
  }

}
