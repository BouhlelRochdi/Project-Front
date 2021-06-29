import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http: HttpClient) { }

  createReservation(id, data): Observable <any>{
    return this.http.post(`http://localhost:3000/api//reservation/${id}`, data)
  }
}
