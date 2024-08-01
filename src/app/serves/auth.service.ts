import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor() {
    this.checkToken();
  }

  // Check if a token exists in localStorage and update the logged-in state
  private checkToken() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const token = localStorage.getItem("patientToken");
      if (token) {
        this.loggedIn.next(true); // Set loggedIn to true if token is found
      }
    }
  }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  // New method to get the current value
  isLoggedInValue(): boolean {
    return this.loggedIn.value;
  }

  login() {
    this.loggedIn.next(true);
  }

  logout() {
    this.loggedIn.next(false);
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem("patientToken"); // Remove the token on logout
    }
  }
}
