import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) { }

  register(data: any): Observable<any> {
    return this.http.post('http://localhost:3000/api/register', data);
  }

  login(data: any): Observable<any> {
    return this.http.post('http://localhost:3000/api/login', data);
  }
  forgotPassword(data: any):Observable<any> {
    return this.http.post('http://localhost:3000/api/forgot-password', data);
  }
}
