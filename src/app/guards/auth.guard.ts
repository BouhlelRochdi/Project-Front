import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigateByUrl('/login');
      return false;

    } else {
      const token = localStorage.getItem('token');
      const decoded: any = jwt_decode(token);
      const isExpiredToken = (Math.floor((new Date).getTime() / 1000)) >= decoded.exp;
      console.log(isExpiredToken);
      if (isExpiredToken) {
        localStorage.removeItem('token');
        this.router.navigateByUrl('/login');
        return false;
      }
      else {
          return true;
        }
       
    }
  }

}
