import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-clinical-notes',
  templateUrl: './clinical-notes.component.html',
  styleUrls: ['./clinical-notes.component.css']
})
export class ClinicalNotesComponent{
  @Input() orderDetails: any[] = [];
  @Input() selectedOrderTypeID: number | null = null;
  @Input() mrn: number | undefined;
  @Input() patientName: string | undefined;

  expandedVisitID: number | null = null; 

  toggleDetails(visitID: number): void {
    this.expandedVisitID = this.expandedVisitID === visitID ? null : visitID;
  }
  
}
