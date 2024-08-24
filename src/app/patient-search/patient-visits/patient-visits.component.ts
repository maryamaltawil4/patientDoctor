import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiSearchService } from '../api-search.service';

@Component({
  selector: 'app-patient-visits',
  templateUrl: './patient-visits.component.html',
  styleUrls: ['./patient-visits.component.css']
})
export class PatientVisitsComponent implements OnInit {
  visitData: any[] = [];
  orderData: any[] = [];
  orderTypes: any[] = [];
  mrn: number = 0;
  selectedVisitID: number | null = null;
  iconMapping: { [key: number]: string } = {
    1: 'fas fa-vial',
    2: 'fas fa-utensils',
    3: 'fas fa-tooth',
    4: 'fas fa-syringe',
    5: 'fas fa-walking',
    6: 'fas fa-pills',
    7: 'fas fa-flask',
    8: 'fas fa-x-ray',
    9: 'fas fa-dna',
    10: 'fas fa-notes-medical',
    11: 'fas fa-user-md',
    12: 'fas fa-hospital',
    13: 'fas fa-apple-alt',
    14: 'fas fa-file-medical-alt',
    15: 'fas fa-iv-bag',
    16: 'fas fa-baby-carriage',
    17: 'fas fa-carrot',
    18: 'fas fa-procedures',
    19: 'fas fa-scalpel',
    20: 'fas fa-clipboard-check',
    21: 'fas fa-notes-medical',
    22: 'fas fa-microscope',
    23: 'fas fa-prescription-bottle-alt',
    24: 'fas fa-clinic-medical',
    25: 'fas fa-tablets'
  };

  constructor(private route: ActivatedRoute, private apiService: ApiSearchService) {}

  ngOnInit(): void {
    this.mrn = +this.route.snapshot.paramMap.get('id')!;
    this.PatientVisits(this.mrn);
    this.PatientOrderTypes(this.mrn);
  }

  PatientVisits(mrn: number) {
    this.apiService.patientVisitOrders(mrn).subscribe((data: any) => {
      this.visitData = data.lstRelatedVisitData;
    });
  }

  PatientOrderTypes(mrn: number) {
    this.apiService.getPatientOrderTypes(mrn).subscribe((data: any) => {
      this.orderTypes = data;
    });
  }

  showOrdersForVisit(visitID: number) {
    this.selectedVisitID = visitID;
    this.apiService.patientVisitOrders(this.mrn).subscribe((data: any) => {
      this.orderData = data.lstVisitOrderData.filter((order: any) => order.visitID === visitID);
    });
  }

  getOrderTypeName(orderTypeID: number): string {
    const orderType = this.orderTypes.find(ot => ot.orderTypeID === orderTypeID);
    return orderType ? orderType.orderTypeNameEn : 'Unknown';
  }
}
