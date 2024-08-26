import { Component, OnInit, HostListener } from '@angular/core';
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
  isLoading: boolean = false;
  visitData: any[] = []; 
  filteredVisitData: any[] = [];  
  orderData: any[] = [];
  allOrderTypes: any[] = [];
  orderTypes: any[] = []; 
  mrn: number = 0;
  selectedOrderTypeID: number | null = null;
  orderDetails: any[] = []; 
  selectedVisitID: number | null = null;
  patientName: string = '';
  isSidebarOpen: boolean = true;
  isLoadingOrderTypes: boolean = false;

  selectedOrder: {
    orderID: number;
    departmentNameEn: string;
    orderDate: string;
  } | null = null;

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
    this.patients = patients;
    this.mrn = mrn;
    // Find the selected patient by MRN
    const patient = this.patients.find(p => p.mrn === mrn);
    if (patient) {
      this.patientName = patient.enFullName; 

      // Store the MRN and patient name in session storage
      sessionStorage.setItem('mrn', JSON.stringify(this.mrn));
      sessionStorage.setItem('patientName', this.patientName);
      this.orderDetails = [];
      this.selectedOrder = null;
      this.loadPatientVisits(mrn);
    }
  }

  
  
  loadPatientVisits(mrn: number) {
    this.apiService.patientVisitOrders(mrn).subscribe((data: any) => {
      const patientVisits = data.lstRelatedVisitData.map((visit: any) => ({
        visitID: visit.visitID,
        visitTypeID: visit.visitTypeID,
        visitSubTypeID: visit.visitSubTypeID,
        visitDate: visit.visitDate,
        visitStartDate: visit.visitStartDate,
        departmentID: visit.departmentID,
        doctorName: visit.doctorUserNameEn,
        patientName: this.patientName,  
        mrn: this.mrn, 
      }));
      this.visitData = patientVisits;
    });
  }


  viewPatientVisits(mrn: number) {
    this.selectedVisitID = null;
    this.mrn = mrn;
    sessionStorage.setItem('mrn', JSON.stringify(this.mrn));
  
    const patient = this.patients.find((p) => p.mrn === mrn);
    this.patientName = patient ? patient.enFullName : '';
  
    if (this.patientName != '')
      sessionStorage.setItem('patientName', this.patientName);
  
    this.PatientVisits(this.mrn);
    this.orderDetails = [];
  }

  viewOrderDetails(orderTypeID: number) {
    this.selectedOrderTypeID = orderTypeID;
    sessionStorage.setItem('selectedOrderTypeID', JSON.stringify(this.selectedOrderTypeID));
  }

  PatientVisits(mrn: number) {
    this.apiService.patientVisitOrders(mrn).subscribe((data: any) => {
      this.visitData = data.lstRelatedVisitData.map((visit: any) => ({
        mrn: this.mrn,
        patientName: this.patientName,
        visitID: visit.visitID,
        visitTypeID: visit.visitTypeID,
        visitSubTypeID: visit.visitSubTypeID,
        visitDate: visit.visitDate,
        visitStartDate: visit.visitStartDate,
        departmentID: visit.departmentID,
        doctorUserID: visit.doctorUserID,
        doctorName: visit.doctorUserNameEn,
        visitArrivalTypeID: visit.visitArrivalTypeID,
        visitModeID: visit.visitModeID,
        visitModeNote: visit.visitModeNote,
        visitSequenceNumber: visit.visitSequenceNumber,
      }));

      this.filteredVisitData = [...this.visitData];
    });
  }

  showOrdersForVisit(visitID: number | undefined) {
    if (visitID !== undefined) {
      this.isLoadingOrderTypes = true;
      this.selectedVisitID = visitID;
      sessionStorage.setItem('selectedVisitID', JSON.stringify(this.selectedVisitID));

      this.apiService.patientVisitOrders(this.mrn).subscribe((data: any) => {
        this.orderData = data.lstVisitOrderData.filter((order: any) => order.visitID === visitID);
        this.updateOrderTypes();
      });
    } else {
      this.selectedVisitID = null;
    }
  }

  updateOrderTypes() {
    if (!this.orderData) {
      this.orderData = [];
    }

    const orderTypeCounts: { [key: number]: number } = {};

    if (Array.isArray(this.orderData)) {
      this.orderData.forEach((order) => {
        if (orderTypeCounts[order.orderTypeID]) {
          orderTypeCounts[order.orderTypeID]++;
        } else {
          orderTypeCounts[order.orderTypeID] = 1;
        }
      });
    }

    this.orderTypes = this.allOrderTypes
      .map((orderType) => ({
        ...orderType,
        count: orderTypeCounts[orderType.orderTypeID] || (orderType.orderTypeID === -1 ? 1 : 0),
      }))
      .filter((orderType) => orderType.count > 0);

    const clinicalNotesType = {
      orderTypeID: -1,
      orderTypeNameEn: 'Clinical Notes',
      clinicalNotes: 'Clinical notes',
      count: 1,
      imageUrl: 'assets/images/clinical notes.jpg',
      backgroundColor: '#FFE4E1',
    };

    if (!this.orderTypes.some((orderType) => orderType.orderTypeID === -1) && this.orderTypes.length > 0) {
      this.orderTypes.push(clinicalNotesType);
    }

    this.isLoadingOrderTypes = false;
  }

  loadFromStorage() {
    const mrn = Number(sessionStorage.getItem('mrn'));
    const selectedOrderTypeID = Number(sessionStorage.getItem('selectedOrderTypeID'));
    const selectedVisitID = Number(sessionStorage.getItem('selectedVisitID'));

    console.log(this.patientName);

    if (mrn) {
      this.viewPatientVisits(mrn);
      this.patientName = sessionStorage.getItem('patientName') || '';
    }

    if (selectedVisitID) {
      this.showOrdersForVisit(selectedVisitID);
    }
  }

 
}
