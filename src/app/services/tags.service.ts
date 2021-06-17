import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TagsService {

  constructor(private http : HttpClient) { }

  saveTags(data): Observable <any> {
    return this.http.post('http://localhost:3000/api/tags', data);
  }

  deleteOne(id): Observable <any>{
    return this.http.delete(`http://localhost:3000/api/tags/${id}`);
  }

  getAlltags(): Observable <any>{
    return this.http.get('http://localhost:3000/api/tags');
  }

  getCurrentTag(id): Observable <any>{
    return this.http.get(`http://localhost:3000/api/tags/${id}`);
  }

  updateTag(data, id): Observable <any>{
    return this.http.put(`http://localhost:3000/api/tags/${id}`, data);
  }
}
