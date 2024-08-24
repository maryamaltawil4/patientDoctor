import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorAvailableDaysComponent } from './doctor-available-days.component';

describe('DoctorAvailableDaysComponent', () => {
  let component: DoctorAvailableDaysComponent;
  let fixture: ComponentFixture<DoctorAvailableDaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorAvailableDaysComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorAvailableDaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
