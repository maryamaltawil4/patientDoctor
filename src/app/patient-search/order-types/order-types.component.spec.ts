import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderTypesComponent } from './order-types.component';

describe('OrderTypesComponent', () => {
  let component: OrderTypesComponent;
  let fixture: ComponentFixture<OrderTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderTypesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
