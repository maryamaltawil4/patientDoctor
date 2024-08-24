import { Component, OnInit, HostListener } from '@angular/core';
import { ApiSearchService } from '../api-search.service';
import { Router } from '@angular/router';
import { SidebarService } from '../sidebar.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
// import { HighlightPipe } from '../../highlight.pipe';





@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
 
})
export class SearchComponent implements OnInit {
  isExpanded = false;
  searchTerm: string = '';
  visitSearchTerm: string = '';  // New search term for visits table
  patients: any[] = [];
  currentPage: number = 1;
  pageSize: number = 11;
  totalPages: number = 1;
  isLoading: boolean = false;
  visitData: any[] = [];  // Original visit data
  filteredVisitData: any[] = [];  // Filtered visit data for display
  orderData: any[] = [];
  allOrderTypes: any[] = []; // To hold all order types initially
  orderTypes: any[] = []; // To hold filtered order types
  mrn: number = 0;
  selectedOrderTypeID: number | null = null; // To track the selected order type ID
  orderDetails: any[] = []; // To hold order details fetched from the API
  selectedVisitID: number | null = null;
  patientName: string = ''; // To hold the selected patient's name
  isSidebarOpen: boolean = true;
  isLoadingOrderTypes: boolean = false;
  isLoadingOrderDetails: boolean = false; 

  imageMapping: { [key: number]: string } = {
    1: 'assets/images/blood.jpg',
    2: 'assets/images/Diet Request.jpg',
    3: 'assets/images/Dialysis.png',
    4: 'assets/images/Chemotherapy Protocol Order.jpg',
    5: 'assets/images/Physiotherapy Order.png',
    6: 'assets/images/Drug.png',
    7: 'assets/images/Lab.png',
    8: 'assets/images/Radiology.jpg',
    9: 'assets/images/Pathology.jpg',
    10: 'assets/images/Genetics.jpg',
    11: 'assets/images/Physician.jpg',
    12: 'assets/images/BloodBank.png',
    13: 'assets/images/Diet.png',
    14: 'assets/images/Consultation.jpg',
    15: 'assets/images/IV Fluid.png',
    16: 'assets/images/Milk.jpg',
    17: 'assets/images/Nutrition Order.jpg',
    18: 'assets/images/Catheterization.png',
    19: 'assets/images/Operation.jpg',
    20: 'assets/images/Procedure.jpg',
    21: 'assets/images/Visit Services and activites.png',
    22: 'assets/images/Microbiology.jpg',
    23: 'assets/images/Prescription Order.jpg',
    24: 'assets/images/PharmacyPOS.jpg',
    25: 'assets/images/Drug - By Scientific Name.jpg',
  };

  colorMapping: { [key: number]: string } = {
    1: '#FFDAB9', // PeachPuff
    2: '#B0E0E6', // PowderBlue
    3: '#98FB98', // PaleGreen
    4: '#FAFAD2', // LightGoldenRodYellow
    5: '#FFE4B5', // Moccasin
    6: '#D8BFD8', // Thistle
    7: '#FFE4E1', // MistyRose
    8: '#D4C9C3', // Khaki
    9: '#E0FFFF', // LightCyan
    10: '#F5DEB3', // Wheat
    11: '#ADD8E6', // LightBlue
    12: '#FFB6C1', // LightPink
    13: '#FFA07A', // LightSalmon
    14: '#E6E6FA', // Lavender
    15: '#FFFACD', // LemonChiffon
    16: '#E0FFFF', // LightCyan
    17: '#F0FFF0', // HoneyDew
    18: '#FDF5E6', // OldLace
    19: '#FFF5EE', // SeaShell
    20: '#F5F5DC', // Beige
    21: '#C3D4D6', // LightSteelBlue
    22: '#FFF0F5', // LavenderBlush
    23: '#F5FFFA', // MintCream
    24: '#FFFFE0', // LightYellow
    25: '#FAF0E6', // Linen
  };

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
    this.search();
  }

  expand() {
    this.isExpanded = true;
  }

  search() {
    if (this.isLoading) return;
    this.isLoading = true;
    this.apiService.patientsList(this.searchTerm, this.currentPage, this.pageSize).subscribe((data: any) => {
      this.patients = [...this.patients, ...data.lstData];
      this.totalPages = Math.ceil(data.rowCount / this.pageSize);
      this.isLoading = false;
    });
  }

  onSearchInput() {
    this.currentPage = 1;
    this.patients = [];
    this.search();
  }



  onScroll(event: Event) {
    const element = event.target as HTMLElement;
    if (element.scrollTop + element.clientHeight >= element.scrollHeight - 50) {
      if (this.currentPage < this.totalPages && !this.isLoading) {
        this.currentPage++;
        this.search();
      }
    }
  }

  viewPatientVisits(mrn: number) {
    this.selectedVisitID = null;
    this.mrn = mrn;
    sessionStorage.setItem('mrn', JSON.stringify(this.mrn));

    const patient = this.patients.find((p) => p.mrn === mrn);
    this.patientName = patient ? patient.enFullName : '';

    if (this.patientName != '')
      sessionStorage.setItem('patientName', this.patientName);

    this.isExpanded = false;
    this.PatientVisits(this.mrn);
    this.PatientOrderTypes(this.mrn);
    this.orderDetails = [];
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

  PatientOrderTypes(mrn: number) {
    // Only proceed if a valid MRN is provided
    
    if (mrn) {
      this.apiService.getPatientOrderTypes(mrn).subscribe((data: any) => {
        // Map the existing order types
        this.allOrderTypes = data.map((orderType: any) => ({
          ...orderType,
          imageUrl: this.imageMapping[orderType.orderTypeID] || 'assets/images/default.jpg', // Image for existing order types
          backgroundColor: this.colorMapping[orderType.orderTypeID] || '#FFFFFF', // Background color for existing order types
        }));

        // Add clinical notes only if MRN is valid
        const clinicalNotesType = {
          orderTypeID: -1, // Use a unique ID for clinical notes
          orderTypeNameEn: 'Clinical Notes',
          clinicalNotes: 'Clinical notes', // Clinical notes text
          count: 1, // Count for clinical notes
          imageUrl: 'assets/images/clinical notes.jpg', // Image path for clinical notes
          backgroundColor: '#FFE4E1', // Background color for clinical notes
        };

        this.allOrderTypes.push(clinicalNotesType); // Add clinical notes type to the list

        this.orderTypes = [...this.allOrderTypes]; // Display all order types initially
      });
    } else {
      // If MRN is not valid, clear the order types list
      this.orderTypes = [];
    }
  }

  showOrdersForVisit(visitID: number) {
    this.isLoadingOrderTypes = true; 
    this.selectedVisitID = visitID;
    sessionStorage.setItem('selectedVisitID', JSON.stringify(this.selectedVisitID));

    this.apiService.patientVisitOrders(this.mrn).subscribe((data: any) => {
      this.orderData = data.lstVisitOrderData.filter((order: any) => order.visitID === visitID);

      // Update order types based on the selected visit
      this.updateOrderTypes();
    });
  }

  viewAllOrders() {
    this.isLoadingOrderTypes = true; // Start loading spinner
    this.selectedVisitID = null; // Reset selected visit to indicate "All"
    sessionStorage.setItem('selectedVisitID', JSON.stringify(this.selectedVisitID));
    this.PatientOrderTypes(this.mrn);
    this.updateOrderTypes();
    this.orderDetails = []; // Clear current order details
  }
  
  updateOrderTypes() {
    if (!this.orderData) {
      this.orderData = [];
    }
  
    const orderTypeCounts: { [key: number]: number } = {};
  
    // Iterate over orderData only if it's defined and is an array
    if (Array.isArray(this.orderData)) {
      this.orderData.forEach((order) => {
        if (orderTypeCounts[order.orderTypeID]) {
          orderTypeCounts[order.orderTypeID]++;
        } else {
          orderTypeCounts[order.orderTypeID] = 1;
        }
      });
    }
  
    // Map and filter orderTypes
    this.orderTypes = this.allOrderTypes
      .map((orderType) => {
        return {
          ...orderType,
          count: orderTypeCounts[orderType.orderTypeID] || (orderType.orderTypeID === -1 ? 1 : 0),
        };
      })
      .filter((orderType) => orderType.count > 0);
  
    // Ensure "Clinical Notes" is always included
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
  
    this.isLoadingOrderTypes = false; // Stop loading spinner after loading is done
  }
  

  preventClose(event: MouseEvent) {
    event.stopPropagation();
  }

  @HostListener('window:click')
  closeDropdown() {
    this.isExpanded = false;
  }

  getOrderTypeName(orderTypeID: number): string {
    const orderType = this.orderTypes.find((ot) => ot.orderTypeID === orderTypeID);
    return orderType ? orderType.orderTypeNameEn : 'Unknown';
  }

  viewOrderDetails(orderTypeID: number) {
    this.isLoadingOrderDetails = true; 
    this.selectedOrderTypeID = orderTypeID;
    sessionStorage.setItem('selectedOrderTypeID', JSON.stringify(this.selectedOrderTypeID));
  
    if (orderTypeID === -1) { // Assuming -1 is the ID for Clinical Notes
        // Show Clinical Notes
        this.apiService.patientVisitOrders(this.mrn).subscribe((data: any) => {
            this.orderDetails = data.lstRelatedVisitData.map((visit: any) => ({
                visitID: visit.visitID,
                visitTypeID: visit.visitTypeID,
                visitSubTypeID: visit.visitSubTypeID,
                visitDate: visit.visitDate,
                visitStartDate: visit.visitStartDate,
                departmentID: visit.departmentID,
                doctorUserID: visit.doctorUserID,
                doctorName: visit.doctorUserNameEn,
                historyOfPresentIllness: visit.historyOfPresentIllness,
                patientComplaints: visit.patientComplaints,
                reviewOfSystems: visit.reviewOfSystems,
                physicalExamination: visit.physicalExamination,
                recommendationAndTreatmentPlan: visit.recommendationAndTreatmentPlan,
                dischargeMedication: visit.dischargeMedication,
                dischargeFollowUp: visit.dischargeFollowUp,
                pastMedical: visit.pastMedical,
                pastSurgical: visit.pastSurgical,
                pastFamilySocialHistory: visit.pastFamilySocialHistory,
            }));
            this.isLoadingOrderDetails = false; 
        });
    } else {
        // Show regular orders
        this.apiService.visitOrdersDetailsBasedOrderType(this.selectedVisitID, orderTypeID, this.mrn).subscribe((data: any) => {
            const order = data.lstBasedOrderType && data.lstBasedOrderType.length > 0 ? data.lstBasedOrderType[0] : null;
            if (order) {
                this.selectedOrder = {
                    orderID: order.orderID,
                    departmentNameEn: order.departmentNameEn,
                    orderDate: order.orderDate
                };
                this.orderDetails = order.lstData || [];
            } else {
                this.selectedOrder = null;
                this.orderDetails = [];
            }
            this.isLoadingOrderDetails = false; 
        });
    }
}

  

  loadFromStorage() {
    const mrn = Number(sessionStorage.getItem('mrn'));
    const selectedOrderTypeID = Number(sessionStorage.getItem('selectedOrderTypeID'));
    const selectedVisitID = Number(sessionStorage.getItem('selectedVisitID'));

    
    console.log( this.patientName)

    if (mrn) {
        this.viewPatientVisits(mrn);
        this.patientName = sessionStorage.getItem('patientName') || '';
    }

    if (selectedVisitID) {
        this.showOrdersForVisit(selectedVisitID);
    }

    if (selectedOrderTypeID) {
        this.viewOrderDetails(selectedOrderTypeID);
    }
}



  
  onSearch() {
    this.filterVisits();
    this.onSearchInput();
    this.selectedVisitID = null;
  }
  
  filterVisits() {
    if (this.visitSearchTerm) {
      const term = this.visitSearchTerm.toLowerCase();
      this.filteredVisitData = this.visitData.filter(visit => 
        visit.mrn.toString().includes(term) ||
        visit.patientName.toLowerCase().includes(term) ||
        visit.visitID.toString().includes(term) ||
        visit.visitStartDate.toLowerCase().includes(term) ||
        visit.visitDate.toLowerCase().includes(term)
      );
    } else {
      this.filteredVisitData = [...this.visitData];
    }
    this.selectedVisitID = null;
  }

}
