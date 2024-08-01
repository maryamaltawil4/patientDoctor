import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {jwtDecode} from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  currentuser: any = null;

  constructor(private _HttpClient: HttpClient) { }

  currentPatient() {
    const token = localStorage.getItem("patientToken");
    if (token) {
      const decoded = jwtDecode(token);
      this.currentuser = decoded;
    }
  }

  login(patient: any): Observable<any> {
    return this._HttpClient.get(`http://192.236.163.206:8005/api/Account/HisPatientLogin?MRN=${patient.MRN}&Mobile=${patient.Mobile}&Password=${patient.Password}&LoginMethod=${patient.LoginMethod}`);
  }

  patientDetail(): Observable<any> {
    const token = localStorage.getItem("patientToken");
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this._HttpClient.get('http://192.236.163.206:8005/api/HIS/GetPatientMedicalProfileInfo', { headers });
  }
  getAppointments(): Observable<any> {
    const token = localStorage.getItem("patientToken");
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this._HttpClient.get('http://192.236.163.206:8005/api/HIS/PossiblePatientAppintmentsDates', { headers });
  }
  getVisits(): Observable<any> {
    const token = localStorage.getItem("patientToken");
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this._HttpClient.get('http://192.236.163.206:8005/api/HIS/GetPatientDoctorsHeVisit', { headers });
  }
}
