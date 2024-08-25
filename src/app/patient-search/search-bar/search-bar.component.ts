import { Component, Output, EventEmitter, HostListener } from '@angular/core';
import { ApiSearchService } from '../api-search.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {

  searchTerm: string = '';
  patients: any[] = [];
  isExpanded: boolean = false;
  isLoading: boolean = false;
  currentPage: number = 1;
  pageSize: number = 11;
  totalPages: number = 1;

  @Output() patientSelected = new EventEmitter<{ mrn: number, patients: any[] }>();

  constructor(private apiService: ApiSearchService) {}

  expand() {
    this.isExpanded = true;
    this.onSearchInput();
  }

  search() {
    if (this.isLoading) return;
    this.isLoading = true;
    this.apiService.patientsList(this.searchTerm, this.currentPage, this.pageSize).subscribe((data: any) => {
      this.patients = [...this.patients, ...data.lstData];
      this.totalPages = Math.ceil(data.rowCount / this.pageSize);
      this.isLoading = false;
    });
  }

  onSearchInput() {
    this.currentPage = 1;
    this.patients = [];
    this.search();
  }

  onSearchClick() {
    if (this.patients.length > 0 && this.patients[0].mrn) {
      this.viewPatientVisits(this.patients[0].mrn); // Show visits for the first patient in the list
    }
  }

  onScroll(event: Event) {
    const element = event.target as HTMLElement;
    if (element.scrollTop + element.clientHeight >= element.scrollHeight - 50) {
      if (this.currentPage < this.totalPages && !this.isLoading) {
        this.currentPage++;
        this.search();
      }
    }
  }

  @HostListener('window:click')
  closeDropdown() {
    this.isExpanded = false;
  }

  preventClose(event: MouseEvent) {
    event.stopPropagation();
  }

  viewPatientVisits(mrn: number) {
    sessionStorage.setItem('selectedOrderTypeID', JSON.stringify(""));
    this.patientSelected.emit({ mrn, patients: this.patients }); // Emit MRN and patients array
    this.isExpanded = false; // Close the dropdown if necessary
  }
}
