import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private httpClient : HttpClient) { }

  getAllEvents(): Observable <any>{
    return this.httpClient.get('http://localhost:3000/api/events');
  }
  AddEvent(data): Observable <any>{
    return this.httpClient.post('http://localhost:3000/api/events', data);
  }
  updateEventService(data, id): Observable <any>{
    return this.httpClient.put(`http://localhost:3000/api/events/${id}`,data);
  }

  deleteEvent(id): Observable <any>{
    return this.httpClient.delete(`http://localhost:3000/api/events/${id}`);
  }

  getCurrentEvent(id): Observable <any>{
    return this.httpClient.get(`http://localhost:3000/api/events/${id}`);
  }
}
