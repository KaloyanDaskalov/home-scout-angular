import { Component, ViewChild } from '@angular/core';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {

  @ViewChild('f') formData!: NgForm;
  faEnvelope = faEnvelope;

  constructor(
    private authService: AuthService
  ) { }

  onSubmit() {
  
    if ( this.formData.valid ) {
      this.authService.ForgotPassword(this.formData.form.value.email);
    }  
  }
}
