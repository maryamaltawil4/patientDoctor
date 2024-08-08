import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private baseUrl: string = "http://192.236.163.206:7001/api";
  private doctors: Observable<any> = of({});
  private doctorDetailsData: Observable<any> = of({});


  constructor(private _HttpClient: HttpClient) { }

  getDepartments(): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/AutoComplete/Lookups?categoryCode=HIS_CompanyDepartment`);
  }

  getBranches(departmentId: string): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/AutoComplete/Lookups?categoryCode=HIS_BranchesBasedDepartment&Id1=${departmentId}`);
  }

  fetchDoctors(departmentId: string): Observable<any> {
    this.doctors = this._HttpClient.get(`${this.baseUrl}/HIS/GetUsersAllowDepartment?DepartmentId=${departmentId}`);
    return this.doctors;
  }

  fetchDoctorDetails(doctorId: string): Observable<any>{
    return this._HttpClient.get(`${this.baseUrl}/HIS/GetDoctorViewDetails?UserID=${doctorId}`);
  }

  getDoctorDetails(): Observable<any> {
    return this.doctorDetailsData;
  }

  getDoctorAvailableAppointments(doctorSelect :string |null , departmentSelect:string |null , branchSelect :string |null ,currentDate?: string | null): Observable<any> {
   return this._HttpClient.get(`${this.baseUrl}/HIS/GetDoctorAvailableAppointments?DoctorId=${doctorSelect}&DepartmentId=${departmentSelect}&BranchId=${branchSelect}&CurrentDate=${currentDate? currentDate : ""}`);
   
  }

  getDoctorAvailableDays(doctorSelect :string |null , departmentSelect:string |null , branchSelect :string |null ,fromDate: string, toDate: string): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/HIS/GetDoctorAvailableDaysToAppintments?DoctorId=${doctorSelect}&DepartmentId=${departmentSelect}&BranchId=${branchSelect}&FromDate=${fromDate}&ToDate=${toDate}`);

  }
}
