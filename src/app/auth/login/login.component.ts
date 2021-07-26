import { Component, ViewChild } from '@angular/core';
import { faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @ViewChild('f') formData!: NgForm;
  faUser = faUser;
  faEnvelope = faEnvelope;
  faLock = faLock;

  constructor(
    private authService: AuthService
  ) { }

  onSubmit() {
    const {email = '', password = ''} = this.formData.form.value;

    if ( this.formData.valid ) {
      this.authService.SignIn(email, password);
    }  
  }
}
