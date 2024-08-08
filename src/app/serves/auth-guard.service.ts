import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { CanActivate, CanActivateChild, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private _router: Router ,private authService: AuthService) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authenticate();
  }
  private authenticate(): boolean {
    if (!this.authService.isUserLoggedIn()) {
      this._router.navigateByUrl("/login");
      return false;
    } else {
      return true;
    }
  }
}
  