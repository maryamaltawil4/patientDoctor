import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-visit-list',
  templateUrl: './visit-list.component.html',
  styleUrls: ['./visit-list.component.css']
})
export class VisitListComponent implements OnChanges {

  visitSearchTerm: string = '';
  selectedVisitID: number | null = null;

  @Input() visitData: any[] = [];  
  @Output() showOrdersForVisit = new EventEmitter<number | undefined>();

  filteredVisitData: any[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['visitSearchTerm'] || changes['visitData']) {
      this.filterVisits();
    }
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
    // Handle the case where visitID is undefined
    this.selectedVisitID = visitID !== undefined ? visitID : null;
    this.showOrdersForVisit.emit(visitID); 
  }

  onFindClick() {
    this.filterVisits(); 
  }
}
