import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { faHome,faDollarSign, faImage, faMap, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  @ViewChild('f') formData!: NgForm;
  faHome= faHome;
  faDollarSign = faDollarSign;
  faImage = faImage;
  faMap = faMap;
  faInfoCircle = faInfoCircle;

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit () {
    console.log(this.formData.form);
    
  }
}
