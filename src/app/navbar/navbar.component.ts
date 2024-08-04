import { Component } from '@angular/core';
import { LoginComponent } from "../login/login.component";
import { DoctorsVisitedComponent } from '../doctors-visited/doctors-visited.component';
import { PatientDetailComponent } from "../patient-detail/patient-detail.component";
import { PossiblePatientAppintmentsDatesComponent } from '../possible-patient-appintments-dates/possible-patient-appintments-dates.component';
import { RouterModule } from '@angular/router';
import { BookForPatientModule } from '../book-for-patient/book-for-patient.module';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

}
