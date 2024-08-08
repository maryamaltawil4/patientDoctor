import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService } from '../book.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-get-doctor-available-appointments',
  standalone: true,
  imports: [
    CommonModule,
    FullCalendarModule,
    ReactiveFormsModule,
  ],
  templateUrl: './get-doctor-available-appointments.component.html',
  styleUrls: ['./get-doctor-available-appointments.component.css'],
  providers: [],
})
export class GetDoctorAvailableAppointmentsComponent implements OnInit {

  form: FormGroup;
  calendarOptions: CalendarOptions;
  doctorId: string | null = null;
  departmentId: string | null = null;
  branchId: string | null = null;

  constructor(
    private bookService: BookService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      fromDate: [''],
      toDate: ['']
    });

    this.calendarOptions = {
      height: 500,
      initialView: 'dayGridMonth',
      plugins: [dayGridPlugin, interactionPlugin],
      events: [],
      dateClick: this.handleDateClick.bind(this)
    };
  }

  ngOnInit(): void {
   
    this.doctorId = this.route.snapshot.paramMap.get('id');
    this.departmentId = this.route.snapshot.paramMap.get('departmentId');
    this.branchId = this.route.snapshot.paramMap.get('branchId');
  }

  fetchAvailableDays(): void {
    const { fromDate, toDate } = this.form.value;
    const formattedFromDate = this.formatDate(new Date(fromDate));
    const formattedToDate = this.formatDate(new Date(toDate));

    this.bookService.getDoctorAvailableDays(this.doctorId,this.departmentId,this.branchId,formattedFromDate, formattedToDate).subscribe(response => {
      const events = response.lstData.map((day: any) => ({
        title: day.anyAvailable ? 'Available' : 'Unavailable',
        start: day.dayDate,
        backgroundColor: day.anyAvailable ? '#28a745' : '#dc3545'
      }));
      this.calendarOptions.events = events;
    });
  }

  handleDateClick(arg: any) {
    const formattedDate = this.formatDate(arg.date);
    this.bookService.getDoctorAvailableAppointments(this.doctorId,this.departmentId,this.branchId,formattedDate).subscribe(response => {
      const availableSlots = response.lstData;
      if (availableSlots.length > 0) {
        this.showTimeSlots(availableSlots);
      } else {
        Swal.fire('No available time slots', 'There are no available time slots for this date.', 'info');
      }
    });
  }

  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }

  showTimeSlots(availableSlots: any[]) {
    const slots = availableSlots.map(slot => `From: ${slot.fromTime} - To: ${slot.toTime}`).join('<br>');
    Swal.fire({
      title: 'Available Time Slots',
      html: slots,
      icon: 'info',
      confirmButtonText: 'OK'
    });
  }

}
