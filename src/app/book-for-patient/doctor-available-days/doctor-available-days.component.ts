import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { CalendarModule,  } from 'angular-calendar';

@Component({
  selector: 'app-doctor-available-days',
  standalone: true,
  imports: [CommonModule ,MatDatepickerModule,
    MatNativeDateModule,
    CalendarModule,
    ReactiveFormsModule,
    MatInputModule],

  templateUrl: './doctor-available-days.component.html',
  styleUrl: './doctor-available-days.component.css'
})
export class DoctorAvailableDaysComponent  implements OnInit {

  availableDays: any[] = [];
  form: FormGroup;

  constructor(private bookService: BookService, private fb: FormBuilder) {
    this.form = this.fb.group({
      fromDate: [''],
      toDate: ['']
    });
  }

  ngOnInit(): void {}

  fetchAvailableDays(): void {
    const { fromDate, toDate } = this.form.value;
    const formattedFromDate = this.formatDate(new Date(fromDate));
    const formattedToDate = this.formatDate(new Date(toDate));

    this.bookService.getDoctorAvailableDays(formattedFromDate, formattedToDate).subscribe(response => {
      this.availableDays = response.lstData;
    });
  }

  formatDate(date: Date): string {
    return date.toISOString(); // Format the date to ISO 8601 standard
  }
}