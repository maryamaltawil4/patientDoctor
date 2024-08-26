import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { ApiSearchService } from '../api-search.service';

@Component({
  selector: 'app-order-types',
  templateUrl: './order-types.component.html',
  styleUrls: ['./order-types.component.css']
})
export class OrderTypesComponent implements OnChanges {
  @Input() selectedVisitID: number | null = null;
  @Input() mrn: number | null = null;
  
  @Output() orderTypeSelected = new EventEmitter<number>();
  @Output() seeAllOrders = new EventEmitter<void>();

  orderTypes: any[] = [];
  orderData: any[] = [];
  isLoadingOrderTypes: boolean = false;
  allOrderTypes: any[] = [];

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

  constructor(private apiService: ApiSearchService) {}

  ngOnChanges() {
    if (this.mrn !== null) {
      this.loadOrderTypes(this.mrn);
    }
  }

  loadOrderTypes(mrn: number) {
    this.isLoadingOrderTypes = true;
    this.apiService.getPatientOrderTypes(mrn).subscribe((data: any) => {
      this.allOrderTypes = data.map((orderType: any) => ({
        ...orderType,
        imageUrl: this.imageMapping[orderType.orderTypeID] || 'assets/images/default.jpg',
        backgroundColor: this.colorMapping[orderType.orderTypeID] || '#FFFFFF',
      }));

      const clinicalNotesType = {
        orderTypeID: -1,
        orderTypeNameEn: 'Clinical Notes',
        clinicalNotes: 'Clinical notes',
        count: 1,
        imageUrl: 'assets/images/clinical notes.jpg',
        backgroundColor: '#FFE4E1',
      };

      this.allOrderTypes.push(clinicalNotesType);

      this.filterOrderTypesByVisit();
      this.isLoadingOrderTypes = false;
    });
  }

  filterOrderTypesByVisit() {
    if (this.selectedVisitID !== null) {
      this.apiService.patientVisitOrders(this.mrn!).subscribe((data: any) => {
        const orderData = data.lstVisitOrderData.filter((order: any) => order.visitID === this.selectedVisitID);
        const orderTypeCounts: { [key: number]: number } = {};

        orderData.forEach((order: any) => {
          if (orderTypeCounts[order.orderTypeID]) {
            orderTypeCounts[order.orderTypeID]++;
          } else {
            orderTypeCounts[order.orderTypeID] = 1;
          }
        });

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
      });
    } else {
      this.orderTypes = [...this.allOrderTypes];
    }
  }

  viewOrderDetails(orderTypeID: number): void {
    this.orderTypeSelected.emit(orderTypeID);
  }

  viewAllOrders(): void {
    this.selectedVisitID = null;
    sessionStorage.setItem('selectedVisitID',"");
    this.filterOrderTypesByVisit();
    this.seeAllOrders.emit();
  }
}