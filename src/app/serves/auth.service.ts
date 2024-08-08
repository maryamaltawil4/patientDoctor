import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {}
  
  isUserLoggedIn(): boolean {
    if (localStorage.getItem("patientToken") != null) {
      return true;
    }
    return false;
  }

}
