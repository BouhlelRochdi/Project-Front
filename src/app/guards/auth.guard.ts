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
      const currentDate = new Date().getTime();
      const tokenDate = decoded.exp;
      // tokenDate.setUTCDate(decoded.exp);
      console.log('currentDate ==> ', currentDate);
      console.log('tokenDate ==> ', tokenDate);
      if (tokenDate < currentDate) {
      //   const notSame = currentDate.getTime() !== tokenDate.getTime();
        console.log('token date is newer than currentDate');
        return false;
      }
      else 
      if( tokenDate > currentDate){
        console.log('tokendate is bigger than currentDate');
        return false;
      }
      else {
        console.log('they are equale');
        return true;
        
      }
    }
  }

}
