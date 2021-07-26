import { Component, ViewChild } from '@angular/core';
import { faUser, faEnvelope, faLock, faKey } from '@fortawesome/free-solid-svg-icons';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  @ViewChild('f') formData!: NgForm;
  faUser = faUser;
  faEnvelope = faEnvelope;
  faLock = faLock;
  faKey = faKey;
  passMatch: boolean = true;

  constructor(private authService: AuthService) {
  }

  onSubmit () {
    const {email = '', password = '', repeatPassword = ''} = this.formData.form.value;

    if ( this.formData.valid && (password === repeatPassword)) {
      this.authService.SignUp(email, password);
    }
    }
}
