import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { CommonModule } from '@angular/common';
import { map, Observable, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { GetDoctorAvailableAppointmentsComponent } from "../get-doctor-available-appointments/get-doctor-available-appointments.component";

@Component({
  selector: 'app-doctors',
  standalone: true,
  imports: [CommonModule, GetDoctorAvailableAppointmentsComponent],
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit {

  dataDoctors: Observable<any> = of({});
  departmentId: string | null = null;
  branchId: string | null = null;

  constructor(private _BookService: BookService, private _Router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.departmentId = this.route.snapshot.paramMap.get('departmentId');
    this.branchId = this.route.snapshot.paramMap.get('branchId');

    if (this.departmentId && this.branchId) {
      this.dataDoctors = this._BookService.fetchDoctors(this.departmentId).pipe(map(x => x.lstData));
    }
  }

  showDetails(doctorId: string) {
    if (this.departmentId && this.branchId) {
      this._Router.navigate(['/bookForPatient/doctor', this.departmentId, this.branchId , doctorId]);
    }
  }
}
