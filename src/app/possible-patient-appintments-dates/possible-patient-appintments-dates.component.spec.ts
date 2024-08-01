import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PossiblePatientAppintmentsDatesComponent } from './possible-patient-appintments-dates.component';

describe('PossiblePatientAppintmentsDatesComponent', () => {
  let component: PossiblePatientAppintmentsDatesComponent;
  let fixture: ComponentFixture<PossiblePatientAppintmentsDatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PossiblePatientAppintmentsDatesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PossiblePatientAppintmentsDatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
