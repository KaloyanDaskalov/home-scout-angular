import { Component, OnInit, ViewChild } from '@angular/core';
import { faUser, faEnvelope, faLock, faKey } from '@fortawesome/free-solid-svg-icons';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @ViewChild('f') formData!: NgForm;
  faUser = faUser;
  faEnvelope = faEnvelope;
  faLock = faLock;
  faKey = faKey;
  passMatch: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }
  onSubmit () {
    // console.log('Form submit', this.formData.form.controls.repeatPassword.touched);
    // console.log('Form submit', this.formData.form.value);

    // if (formData.form.value.password === formData.form.value.repeatPassword)
    // if match register else do nothing
    }
}
