import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PatientService } from '../serves/patient.service';
import { Router } from '@angular/router'; 
import { AuthService } from '../serves/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [PatientService]
})
export class LoginComponent {

  loading:boolean=false;

  constructor(private _patientService: PatientService, private _Router: Router , private _authService :AuthService) {}

  loginForm: FormGroup = new FormGroup({
    MRN: new FormControl(null),
    Mobile: new FormControl(null, [Validators.required]),
    NationalityID: new FormControl(null),
    Password: new FormControl(null, [Validators.required]),
    LoginMethod: new FormControl(null, [Validators.required]),
  });

  loginData(formData: FormGroup) {
    this.loading=true;
    if (formData.valid) {
      this._patientService.login(formData.value).subscribe({
        next: (data) => {
          console.log(data);
          localStorage.setItem("patientToken", data.token);
          this._patientService.currentPatient();
          this._authService.login(); 
          this._Router.navigate(['/']);
          this.loading=false;

        },
        error: (error => console.log(error))
      });
    }
  }
}
