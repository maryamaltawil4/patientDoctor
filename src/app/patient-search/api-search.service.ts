import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiSearchService {

  private readonly apiUrl = 'http://192.236.163.206:8005/api/HIS';
  private readonly token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOiIxMDcwMDAyIiwiTmFtZUVuIjoi2LfYp9ix2YIg2YfZiNiv2YTZiiIsIkFjY0FyTmFtZSI6Iti32KfYsdmCINmH2YjYr9mE2YoiLCJuYmYiOjE3MjM0NTA0MjksImV4cCI6MTcyMzUzNjgyOSwiaWF0IjoxNzIzNDUwNDI5fQ.OQeh3BtYz3pUvHJVPvXD8dGe7Lf3QjRdIs-2m5d1fLE'; // Replace with your actual token
  private readonly headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

  constructor(private http: HttpClient) {}

  patientsList(search: string, page: number = 1, pageSize: number = 16) {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString())
      .set('strSearch', search);

    return this.http.get(`${this.apiUrl}/PatientsList`, { headers: this.headers, params });
  }

  patientVisitOrders(patientId: number) {
    const params = new HttpParams().set('PatientId', patientId.toString());
    return this.http.get(`${this.apiUrl}/PatientVisitOrders`, { headers: this.headers, params });
  }

  getPatientOrderTypes(mrn: number) {
    const params = new HttpParams().set('PatientId', mrn.toString());
    return this.http.get(`${this.apiUrl}/GetPatientOrderTypes`, { headers: this.headers, params });
  }

  visitOrdersDetailsBasedOrderType(visitID: number | null, orderTypeID: number, patientId: number) {
    const params: any = { 
      Flag: 'BasedOrderType', 
      OrderTypeID: orderTypeID.toString(), 
      PatientId: patientId.toString() 
    };
  
    if (visitID !== null) {
      params.VisitID = visitID.toString();
    }
  
    return this.http.get(`${this.apiUrl}/VisitOrdersDetailsBasedOrderType`, { headers: this.headers, params });
  }
  
}
