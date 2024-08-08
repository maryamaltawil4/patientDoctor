import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-department',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  departmentData: any = [];
  paginatedData: any = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 0;

  constructor(private _BookService: BookService, private _Router: Router) { }

  ngOnInit(): void {
    this.getDepartment();
  }

  getDepartment() {
    this._BookService.getDepartments().subscribe({
      next: (response) => {
        this.departmentData = response.data;
        this.paginateData();
      }
    });
  }

  paginateData() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedData = this.departmentData.slice(start, end);
    this.totalPages = Math.ceil(this.departmentData.length / this.itemsPerPage);
  }

  selectDepartment(departmentId: string) {
    this._Router.navigate(['bookForPatient/branch-doctors', departmentId]);
  }

  goToPage(page: number) {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      this.paginateData();
    }
  }
}
