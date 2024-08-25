import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientSearchRoutingModule } from './patient-search-routing.module';
import { SearchComponent } from './search/search.component';
import { FormsModule } from '@angular/forms';
import { VisitListComponent } from './visit-list/visit-list.component';
import { ClinicalNotesComponent } from './clinical-notes/clinical-notes.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrderTypesComponent } from './order-types/order-types.component';
import { SearchBarComponent } from './search-bar/search-bar.component';






@NgModule({
  declarations: [SearchComponent , VisitListComponent ,ClinicalNotesComponent , OrderDetailsComponent ,OrderTypesComponent , SearchBarComponent],
  imports: [
    CommonModule,
    FormsModule,
    PatientSearchRoutingModule
  ]
})
export class PatientSearchModule { }
