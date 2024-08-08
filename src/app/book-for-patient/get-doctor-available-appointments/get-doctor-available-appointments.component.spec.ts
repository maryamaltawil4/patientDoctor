import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetDoctorAvailableAppointmentsComponent } from './get-doctor-available-appointments.component';

describe('GetDoctorAvailableAppointmentsComponent', () => {
  let component: GetDoctorAvailableAppointmentsComponent;
  let fixture: ComponentFixture<GetDoctorAvailableAppointmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetDoctorAvailableAppointmentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetDoctorAvailableAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
