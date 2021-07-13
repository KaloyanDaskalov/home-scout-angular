import { Component, OnInit } from '@angular/core';
import { faUser, faEnvelope, faLock, faKey } from '@fortawesome/free-solid-svg-icons';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  faUser = faUser;
  faEnvelope = faEnvelope;
  faLock = faLock;
  faKey = faKey;
  passMatch: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }
  onSubmit (f: NgForm) {
    console.log('Form submit', f.form.status);

    if (f.form.value.password !== f.form.value.repeatPassword) {
      this.passMatch = false;
    }
  }
}
