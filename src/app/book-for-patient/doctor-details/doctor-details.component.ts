import { Component, OnDestroy, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { map, Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { GetDoctorAvailableAppointmentsComponent } from "../get-doctor-available-appointments/get-doctor-available-appointments.component";
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2'; 

@Component({
  selector: 'app-doctor-details',
  standalone: true,
  imports: [CommonModule, GetDoctorAvailableAppointmentsComponent],
  templateUrl: './doctor-details.component.html',
  styleUrls: ['./doctor-details.component.css']
})
export class DoctorDetailsComponent implements OnInit {

  dataDoctor: Observable<any> = of({});
  doctorId: string | null = null;
  departmentId: string | null = null;
  branchId: string | null = null;

  constructor(private _BookService: BookService, private _Router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.doctorId = this.route.snapshot.paramMap.get('id');
    this.departmentId = this.route.snapshot.paramMap.get('departmentId');
    this.branchId = this.route.snapshot.paramMap.get('branchId');
    if (this.doctorId) {
      this.dataDoctor = this._BookService.fetchDoctorDetails(this.doctorId);
    }
  }

  dateDoctor() {
    this._BookService.getDoctorAvailableAppointments(this.doctorId, this.departmentId, this.branchId, "").subscribe({
      next: () => this._Router.navigate(['/bookForPatient/date', this.departmentId, this.branchId , this.doctorId] ),
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'No Data Available',
          text: 'There are no available appointments for this doctor.',
          confirmButtonText: 'OK'
        });
      }
    });
  }
}
