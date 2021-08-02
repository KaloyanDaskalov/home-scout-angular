import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

import { User } from 'src/app/shared/interfaces/user';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  
  option: string = '';
  form = {
    email: '',
    password: ''
  } 

  get currentUser(): User | null {
    return this.authService.getCurrentUser;
  }

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  onOptionChange(opt: string) {
    this.option = opt;
  }

  onEmailChange() {
    if (this.currentUser) {
      this.currentUser.updateEmail( this.form.email )
        .then(_ => this.option='')
    }
  }

  onPasswordChange() {
    if (this.currentUser) {
      this.currentUser.updatePassword(this.form.password)
        .then(_ => this.option='')
    }
  }

  onCancelDelete() {
    return this.option='';
  }

  onConfirmDelete() {
    if (this.currentUser) {
      this.currentUser.delete()
        .then(_ => this.option='')
      this.router.navigate(['/advertisements']);
    }
  }

}
