import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchDoctorsComponent } from './branch-doctors.component';

describe('BranchDoctorsComponent', () => {
  let component: BranchDoctorsComponent;
  let fixture: ComponentFixture<BranchDoctorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BranchDoctorsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BranchDoctorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
