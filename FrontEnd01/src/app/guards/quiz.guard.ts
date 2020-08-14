import { Injectable } from '@angular/core';
import { CanActivate, CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { readFileSync } from 'fs';

@Injectable({
  providedIn: 'root'
})
export class QuizGuard implements CanActivate, CanDeactivate<unknown> {
  constructor(private _authservice: AuthService, private _router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let loggedIn = this._authservice.loggedIn()
      if(!loggedIn) this._router.navigate(['home'])
      return loggedIn
  }
  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let loggedIn = this._authservice.loggedIn()
      if(!loggedIn) {
        return true
      }
      else{
        if (confirm("Are Tou sure You want to leave?! \n leaving Means You'll Leave Your Progress and you cant")) {
          this._authservice.logOut()
          return true
  
        } else {
  
          return false
        }
      }
      

  }
  
}
