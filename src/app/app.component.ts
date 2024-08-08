import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from "./navbar/navbar.component";
import { DoctorsVisitedComponent } from './doctors-visited/doctors-visited.component';
import { CommonModule } from '@angular/common';
import { BookForPatientModule } from './book-for-patient/book-for-patient.module';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ CommonModule,RouterOutlet, LoginComponent, HttpClientModule, NavbarComponent , DoctorsVisitedComponent ,BookForPatientModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'project';

}

