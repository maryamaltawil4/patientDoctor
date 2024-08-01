import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private _router: Router ,private authService: AuthService) {}

    canActivate(): boolean {
      // Check if the user has logged in during the current session
      const isLoggedIn = this.authService.isLoggedInValue();
  
      // If not logged in, redirect to the login page
      if (!isLoggedIn) {
        this._router.navigate(['/login']);
        return false;
      }
  
      return true;
    }
  }