import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { BookService } from '../book-for-patient/book.service';


@Component({
  selector: 'app-branch-doctors',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './branch-doctors.component.html',
  styleUrls: ['./branch-doctors.component.css']
})
export class BranchDoctorsComponent implements OnInit {
  departmentId: string | null = null;
  branchesData: any = [];
  selectedBranch: string | null = null;

  constructor(private _BookService: BookService, private route: ActivatedRoute, private _Router: Router) { }

  ngOnInit(): void {
    this.departmentId = this.route.snapshot.paramMap.get('id');
    if (this.departmentId) {
      this.getBranches(this.departmentId);
    }
  }

  getBranches(departmentId: string) {
    this._BookService.getBranches(departmentId).subscribe({
      next: (response) => this.branchesData = response.data
    });
  }

  onBranchSelect(event: any) {
    this.selectedBranch = event.target.value;
  }

  showDoctors() {
    if (this.selectedBranch && this.departmentId) {
      this._Router.navigate(['bookForPatient/doctorsdata', this.departmentId, this.selectedBranch]);
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'No Branch Selected',
        text: 'Please select a branch before showing doctors.',
        confirmButtonText: 'OK'
      });
    }
  }
}
