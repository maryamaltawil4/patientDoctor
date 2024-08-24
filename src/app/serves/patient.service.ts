import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private readonly API_BASE_URL = 'http://192.236.163.206:8005/api';

  currentuser: any = null;

  constructor(private _HttpClient: HttpClient) { }

  currentPatient() {
    const token = localStorage.getItem('patientToken');
    if (token) {
      const decoded = jwtDecode(token);
      this.currentuser = decoded;
    }
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('patientToken');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  login(patient: any): Observable<any> {
    return this._HttpClient.get(`${this.API_BASE_URL}/Account/HisPatientLogin?MRN=${patient.MRN}&Mobile=${patient.Mobile}&Password=${patient.Password}&LoginMethod=${patient.LoginMethod}`);
  }

  patientDetail(): Observable<any> {
    return this._HttpClient.get(`${this.API_BASE_URL}/HIS/GetPatientMedicalProfileInfo`, { headers: this.getAuthHeaders() });
  }

  getAppointments(): Observable<any> {
    return this._HttpClient.get(`${this.API_BASE_URL}/HIS/PossiblePatientAppintmentsDates`, { headers: this.getAuthHeaders() });
  }

  getVisits(): Observable<any> {
    return this._HttpClient.get(`${this.API_BASE_URL}/HIS/GetPatientDoctorsHeVisit`, { headers: this.getAuthHeaders() });
  }
}
