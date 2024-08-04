import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DoctorsVisitedComponent } from './doctors-visited/doctors-visited.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PatientDetailComponent } from './patient-detail/patient-detail.component';
import { PossiblePatientAppintmentsDatesComponent } from './possible-patient-appintments-dates/possible-patient-appintments-dates.component';
import { ReportViewComponent } from './report-view/report-view.component';
import { AuthGuardService } from './serves/auth-guard.service';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { 
        path: '', 
        component: NavbarComponent, 
        canActivate: [AuthGuardService],
        children: [
            { path: 'doctors-visited', component: DoctorsVisitedComponent },
            { path: 'patientDetail', component: PatientDetailComponent },
            { path: 'appintmentsDates', component: PossiblePatientAppintmentsDatesComponent },
            { path: 'report-view', component: ReportViewComponent },
            { path: '', redirectTo: '/patientDetail', pathMatch: 'full' }, 
            { path: 'bookForPatient', loadChildren: () => import('../app/book-for-patient/book-for-patient.module').then(m => m.BookForPatientModule) }

        ]
    },
    { path: '**', redirectTo: '/login', pathMatch: 'full' } 
];
