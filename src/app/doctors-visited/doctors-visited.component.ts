import { Component, OnInit } from '@angular/core';
import { PatientService } from '../serves/patient.service';
import { NavbarComponent } from "../navbar/navbar.component";
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctors-visited',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './doctors-visited.component.html',
  styleUrls: ['./doctors-visited.component.css']
})
export class DoctorsVisitedComponent implements OnInit {
  visits: any[] = [];

  constructor(private _PatientService: PatientService , private _router: Router) {}

  ngOnInit(): void {
    this._PatientService.getVisits().subscribe({
      next: (response) => {
        this.visits = response.lstData;
      },
      error: (error) => console.log(error)
    });
  }
  viewAllVisits(): void {
    this._router.navigate(['/report-view'], { queryParams: { visits: JSON.stringify(this.visits) } });
  }
}
