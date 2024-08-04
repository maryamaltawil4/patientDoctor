import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { PatientService } from '../serves/patient.service';
import { ScheduleModule, ScheduleAllModule } from '@syncfusion/ej2-angular-schedule';
import { DayService, WeekService, MonthService, WorkWeekService, AgendaService } from '@syncfusion/ej2-angular-schedule';
import { CalendarEvent, CalendarModule, CalendarView, CalendarMonthViewDay } from 'angular-calendar';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CalendarHeaderComponentComponent } from "../calendar-header-component/calendar-header-component.component";

@Component({
  selector: 'app-possible-patient-appintments-dates',
  standalone: true,
  imports: [
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ScheduleModule,
    ScheduleAllModule,
    CalendarModule,
    CalendarHeaderComponentComponent
  ],
  templateUrl: './possible-patient-appintments-dates.component.html',
  styleUrls: ['./possible-patient-appintments-dates.component.css'],
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService],
})
export class PossiblePatientAppintmentsDatesComponent implements OnInit {
  view: CalendarView = CalendarView.Month;
  viewDate: Date = new Date();
  events$: Observable<CalendarEvent[]> = of([]);
  activeDayIsOpen: boolean = false;

  CalendarView = CalendarView;

  constructor(private patientService: PatientService) {}

  ngOnInit(): void {
    this.fetchEvents();
  }

  fetchEvents(): void {
    this.events$ = this.patientService.getAppointments().pipe(
      map((response: any) => {
        return response.lstData.map((item: any) => ({
          start: new Date(item.appointmentDate),
          title: 'Appointment',
          color: {
            primary: '#1e90ff',
            secondary: '#D1E8FF',
          },
          allDay: true,
        }));
      })
    );
  }

  dayClicked({ day }: { day: CalendarMonthViewDay }): void {
    if (day.events.length === 0 || this.activeDayIsOpen) {
      this.activeDayIsOpen = false;
    } else {
      this.activeDayIsOpen = true;
      this.viewDate = day.date;
    }
  }

  eventClicked(event: CalendarEvent): void {
    console.log('Event clicked', event);
  }

  // New method to handle clicking an event in the list
  goToEvent(event: CalendarEvent): void {
    this.viewDate = event.start; // Set the view date to the event's start date
    this.view = CalendarView.Day; // Switch to day view to see the event
    this.activeDayIsOpen = true; // Open the day view
  }
}
