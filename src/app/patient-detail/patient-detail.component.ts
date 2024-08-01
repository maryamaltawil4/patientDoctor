import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientService } from '../serves/patient.service';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-patient-detail',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.css']
})
export class PatientDetailComponent implements OnInit {

  patientDetails: any;

  constructor(private _PatientService: PatientService) {}

  ngOnInit(): void {
    this._PatientService.patientDetail().subscribe({
      next: (details) => {
        this.patientDetails = details;
      },
      error: (error) => console.log(error)
    });
  }
}
