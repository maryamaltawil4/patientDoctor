import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ApiSearchService } from '../api-search.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnChanges {
  @Input() selectedOrderTypeID: number | null = null;
  @Input() mrn: number | null = null;
  @Input() selectedVisitID: number | null = null;  // This can be null
  isLoadingOrderDetails: boolean = false;
  orderDetails: any[] = []; 
  selectedOrder: {
    orderID: number;
    departmentNameEn: string;
    orderDate: string;
  } | null = null;

  constructor(private apiService: ApiSearchService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['mrn'] || changes['selectedOrderTypeID'] || changes['selectedVisitID']) {
      this.loadOrderDetails();
    }
  }

  loadOrderDetails(): void {
    if (this.mrn && this.selectedOrderTypeID !== null) {
      this.isLoadingOrderDetails = true;

      // Fetch the order details based on selectedOrderTypeID and optional selectedVisitID
      this.apiService.visitOrdersDetailsBasedOrderType(this.selectedVisitID, this.selectedOrderTypeID, this.mrn)
        .subscribe((data: any) => {
          const order = data.lstBasedOrderType && data.lstBasedOrderType.length > 0 ? data.lstBasedOrderType[0] : null;
          if (order) {
            this.selectedOrder = {
              orderID: order.orderID,
              departmentNameEn: order.departmentNameEn,
              orderDate: order.orderDate,
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
}
