import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorsVisitedComponent } from './doctors-visited.component';

describe('DoctorsVisitedComponent', () => {
  let component: DoctorsVisitedComponent;
  let fixture: ComponentFixture<DoctorsVisitedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorsVisitedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorsVisitedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
