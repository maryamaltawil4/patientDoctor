import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentComponent } from './department/department.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { DoctorDetailsComponent } from './doctor-details/doctor-details.component';
import { GetDoctorAvailableAppointmentsComponent } from './get-doctor-available-appointments/get-doctor-available-appointments.component';
import { BranchDoctorsComponent } from './branch-doctors/branch-doctors.component';


const routes: Routes = [
  { path: '', component: DepartmentComponent },
  { path: 'doctor/:departmentId/:branchId', component: DoctorsComponent }, 
  { path: 'branch-doctors/:id', component: BranchDoctorsComponent}, 
  { path: 'doctor/:departmentId/:branchId/:id', component: DoctorDetailsComponent },
  { path: 'date/:departmentId/:branchId/:id', component: GetDoctorAvailableAppointmentsComponent }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookForPatientRoutingModule { }
