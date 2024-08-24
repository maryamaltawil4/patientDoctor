import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientSearchRoutingModule } from './patient-search-routing.module';
import { SearchComponent } from './search/search.component';
import { FormsModule } from '@angular/forms';

import { HighlightPipe } from '../highlight.pipe';
import { PatientVisitsComponent } from './patient-visits/patient-visits.component';




@NgModule({
  declarations: [SearchComponent ,PatientVisitsComponent ],
  imports: [
    CommonModule,
    FormsModule,
    PatientSearchRoutingModule ,HighlightPipe
  ]
})
export class PatientSearchModule { }
