import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { ApiSearchService } from '../api-search.service';

@Component({
  selector: 'app-visit-list',
  templateUrl: './visit-list.component.html',
  styleUrls: ['./visit-list.component.css']
})
export class VisitListComponent implements OnChanges {

  visitSearchTerm: string = '';
  selectedVisitID: number | null = null;

  visitData: any[] = [];  
  @Output() showOrdersForVisit = new EventEmitter<number | undefined>();
  @Output() resetOrderType = new EventEmitter<void>(); // New event emitter for resetting the order type
  @Input() mrn: number = 0;
  @Input() patientName: string = '';
  filteredVisitData: any[] = [];

  constructor(private apiService: ApiSearchService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['mrn'] && changes['patientName']) {
      this.viewPatientVisits(this.mrn);
    }
    if (changes['visitSearchTerm'] || changes['visitData']) {
      this.filterVisits();
    }
  }

  ngOnInit() {
    const storedVisitID = sessionStorage.getItem('selectedVisitID');
    this.selectedVisitID = storedVisitID ? Number(storedVisitID) : null;
    this.filterVisits(); // Filter visits based on the loaded selectedVisitID
  }
  
  loadPatientVisits(mrn: number) {
    this.apiService.patientVisitOrders(mrn).subscribe((data: any) => {
      const patientVisits = data.lstRelatedVisitData.map((visit: any) => ({
        visitID: visit.visitID,
        visitTypeID: visit.visitTypeID,
        visitSubTypeID: visit.visitSubTypeID,
        visitDate: visit.visitDate,
        visitStartDate: visit.visitStartDate,
        departmentID: visit.departmentID,
        doctorName: visit.doctorUserNameEn,
        patientName: this.patientName,  
        mrn: this.mrn, 
      }));
      this.visitData = patientVisits;
      this.filteredVisitData = [...this.visitData]; 
    });
  }

  viewPatientVisits(mrn: number) {
    this.selectedVisitID = null;
    this.mrn = mrn;
    sessionStorage.setItem('mrn', JSON.stringify(this.mrn));
    this.loadPatientVisits(this.mrn);
  }

  filterVisits() {
    if (this.visitSearchTerm) {
      const term = this.visitSearchTerm.toLowerCase();
      this.filteredVisitData = this.visitData.filter(visit => 
        visit.mrn.toString().includes(term) ||
        visit.patientName.toLowerCase().includes(term) ||
        visit.visitID.toString().includes(term) ||
        visit.visitStartDate.toLowerCase().includes(term) ||
        visit.visitDate.toLowerCase().includes(term)
      );
    } else {
      this.filteredVisitData = [...this.visitData]; 
    }
  }

  onVisitClick(visitID: number | undefined) {
    this.selectedVisitID = visitID ?? null;
    sessionStorage.setItem('selectedVisitID', JSON.stringify(this.selectedVisitID));
    this.showOrdersForVisit.emit(visitID);  
    this.resetOrderType.emit();  
  }

  onFindClick() {
    this.filterVisits(); 
  }
}
