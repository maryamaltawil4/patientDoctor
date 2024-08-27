import { Component, OnInit } from '@angular/core';
import { ApiSearchService } from '../api-search.service';
import { Router } from '@angular/router';
import { SidebarService } from '../sidebar.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  patients: any[] = [];
  orderData: any[] = [];
  allOrderTypes: any[] = [];
  orderTypes: any[] = []; 
  mrn: number = 0;
  selectedOrderTypeID: number | null = null;
  selectedVisitID: number | null = null;
  patientName: string = '';
  isLoadingOrderTypes: boolean = false;

  constructor(
    private apiService: ApiSearchService,
    private router: Router,
    private sidebarService: SidebarService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.loadFromStorage(); 
  }

  onPatientSelected({ mrn, patients }: { mrn: number, patients: any[] }) {
    this.selectedVisitID = null;
    this.selectedOrderTypeID = null;
    this.patients = patients;
    this.mrn = mrn;
    const patient = this.patients.find(p => p.mrn === mrn);
    if (patient) {
      this.patientName = patient.enFullName; 
      sessionStorage.setItem('mrn', JSON.stringify(this.mrn));
      sessionStorage.setItem('patientName', this.patientName);
    }
    sessionStorage.removeItem('selectedVisitID');
  }

  viewOrderDetails(orderTypeID: number) {
    this.selectedOrderTypeID = orderTypeID;
    sessionStorage.setItem('selectedOrderTypeID', JSON.stringify(this.selectedOrderTypeID));
  }

  onSeeAllOrders() {
    sessionStorage.removeItem('selectedVisitID');
    sessionStorage.removeItem('selectedOrderTypeID');
    this.selectedOrderTypeID = null;
  }

  onResetOrderType() {
    this.selectedOrderTypeID = null; // Reset the order type ID to null
    sessionStorage.removeItem('selectedOrderTypeID'); // Remove from session storage
  }

  loadFromStorage() {
    const mrn = Number(sessionStorage.getItem('mrn'));
    const selectedOrderTypeID = Number(sessionStorage.getItem('selectedOrderTypeID'));
    const selectedVisitID = sessionStorage.getItem('selectedVisitID') !== null ? Number(sessionStorage.getItem('selectedVisitID')) : null;

    if (mrn) {
      this.mrn = mrn;
      this.patientName = sessionStorage.getItem('patientName') || '';
    }

    this.selectedOrderTypeID = selectedOrderTypeID;
    this.selectedVisitID = selectedVisitID;
  }
}
