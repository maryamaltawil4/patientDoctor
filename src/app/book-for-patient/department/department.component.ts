import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-department',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css'] // Note: changed 'styleUrl' to 'styleUrls'
})
export class DepartmentComponent implements OnInit {
  departmentData: any = [];
  branchesData: any = {};
  clickValeu: string | null = null;

  constructor(private _BookService: BookService) { }

  ngOnInit(): void {
    this.getDepartment();
  }

  getDepartment() {
    this._BookService.departmentApi().subscribe({
      next: (response) => this.departmentData = response.data
    });
  }

  branches(id: string) {
    if(this.clickValeu == id){
      this.clickValeu= null;
    }
     else{
      this.clickValeu =id;
      this._BookService.branchesApi(id).subscribe({
        next: (response) => {
          this.branchesData[id] = response.data;
        },
      });
    }
  
  }

  isActive(id:string) :boolean{
    return this.clickValeu ==  id;
  }


}
