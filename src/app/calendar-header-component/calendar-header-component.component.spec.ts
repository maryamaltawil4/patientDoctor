import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarHeaderComponentComponent } from './calendar-header-component.component';

describe('CalendarHeaderComponentComponent', () => {
  let component: CalendarHeaderComponentComponent;
  let fixture: ComponentFixture<CalendarHeaderComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarHeaderComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarHeaderComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
