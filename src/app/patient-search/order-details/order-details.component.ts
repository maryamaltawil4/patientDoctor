import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent {
  @Input() orderDetails: any[] = [];
  @Input() selectedOrder: { orderID: number, departmentNameEn: string, orderDate: string } | null = null;

 

  

}
