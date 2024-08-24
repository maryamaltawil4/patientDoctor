import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './search/search.component';


const routes: Routes = [
  { path: '', component: SearchComponent , data: { isSidebarOpen: true }} ,

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientSearchRoutingModule { }
