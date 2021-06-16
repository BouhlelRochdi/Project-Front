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

  updatePassword(data: any):Observable<any>{
    return this.http.post(`http://localhost:3000/api/reset-password`, data);
  }

  getAllCompanys(): Observable <any>{
    return this.http.get('http://localhost:3000/api/company');
  }

  addCompany(data: any): Observable <any>{
    return this.http.post('http://localhost:3000/api/createCompany', data);
  }

  updateCompany(id, data): Observable <any>{
    return this.http.put(`http://localhost:3000/api/company/${id}`, data);
  }

  getCurrentCompany(id): Observable <any>{
    return this.http.get(`http://localhost:3000/api/company/${id}`);
  }

  deleteOne(id): Observable <any>{
    return this.http.delete(`http://localhost:3000/api/company/${id}`);
  }
}
