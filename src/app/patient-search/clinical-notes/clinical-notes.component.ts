import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ApiSearchService } from '../api-search.service';

@Component({
  selector: 'app-clinical-notes',
  templateUrl: './clinical-notes.component.html',
  styleUrls: ['./clinical-notes.component.css']
})
export class ClinicalNotesComponent implements  OnChanges {
  @Input() selectedVisitID: number | null = null;
  @Input() mrn: number | null = null;
  @Input() patientName: string = '';
  expandedVisitID: number | null = null; 
  @Input() selectedOrderTypeID: number | null = null;


  orderDetails: any[] = [];
  isLoading: boolean = false;

  constructor(private apiService: ApiSearchService) {}


  ngOnChanges(changes: SimpleChanges): void {
    if ( changes['selectedVisitID'] || changes['selectedOrderTypeID'] ) {
      console.log(this.selectedOrderTypeID +"notes")
      this.loadClinicalNotes();
    }
  }

  loadClinicalNotes(): void {
    if (this.mrn) {
      this.isLoading = true;
      this.apiService.patientVisitOrders(this.mrn).subscribe((data: any) => {
        this.orderDetails = data.lstRelatedVisitData.map((visit: any) => ({
          visitID: visit.visitID,
          visitTypeID: visit.visitTypeID,
          visitSubTypeID: visit.visitSubTypeID,
          visitDate: visit.visitDate,
          visitStartDate: visit.visitStartDate,
          departmentID: visit.departmentID,
          doctorUserID: visit.doctorUserID,
          doctorName: visit.doctorUserNameEn,
          historyOfPresentIllness: visit.historyOfPresentIllness,
          patientComplaints: visit.patientComplaints,
          reviewOfSystems: visit.reviewOfSystems,
          physicalExamination: visit.physicalExamination,
          recommendationAndTreatmentPlan: visit.recommendationAndTreatmentPlan,
          dischargeMedication: visit.dischargeMedication,
          dischargeFollowUp: visit.dischargeFollowUp,
          pastMedical: visit.pastMedical,
          pastSurgical: visit.pastSurgical,
          pastFamilySocialHistory: visit.pastFamilySocialHistory,
        }));
        this.isLoading = false;
      });
    }
  }

  toggleDetails(visitID: number): void {
    this.expandedVisitID = this.expandedVisitID === visitID ? null : visitID;
  }
}
