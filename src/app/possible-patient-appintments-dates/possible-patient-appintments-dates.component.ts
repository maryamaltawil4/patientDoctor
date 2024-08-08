import { Component, OnInit } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { PatientService } from '../serves/patient.service';
import { CommonModule, formatDate } from '@angular/common';

@Component({
  selector: 'app-possible-patient-appintments-dates',
  standalone: true,
  imports: [
    CommonModule,
    FullCalendarModule,
  ],
  templateUrl: './possible-patient-appintments-dates.component.html',
  styleUrls: ['./possible-patient-appintments-dates.component.css']
})
export class PossiblePatientAppintmentsDatesComponent implements OnInit {
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    events: [],
  };
  eventsList: any[] = [];

  constructor(private patientService: PatientService) {}

  ngOnInit(): void {
    this.fetchEvents();
  }

  fetchEvents(): void {
    this.patientService.getAppointments().subscribe((response: any) => {
      const events = response.lstData.map((item: any) => ({
        title: 'Appointment',
        start: new Date(item.appointmentDate),
        color: '#1e90ff',
        allDay: true,
      }));
      this.eventsList = events; // Store events in eventsList for the template
      this.calendarOptions.events = events;
    });
  }

  formatDate(date: Date | string | number | undefined, format: string) {
    if (!date) return 'N/A';
    return formatDate(date, format, 'en-US');
  }

  handleDateClick(arg: any) {
    alert('Date clicked: ' + arg.dateStr);
  }
}
