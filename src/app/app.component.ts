import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from "./navbar/navbar.component";
import { DoctorsVisitedComponent } from './doctors-visited/doctors-visited.component';
import { CommonModule } from '@angular/common';
import { AuthService } from './serves/auth.service';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ CommonModule,RouterOutlet, LoginComponent, HttpClientModule, NavbarComponent , DoctorsVisitedComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'project';

  isLoggedIn: boolean =false ;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.isLoggedIn.subscribe(status => {
      this.isLoggedIn = status;
    });
  }
}

