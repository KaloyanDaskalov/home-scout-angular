import { Component, OnInit } from '@angular/core';
import { faHome,faDollarSign, faImage, faMap } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  faHome= faHome;
  faDollarSign = faDollarSign;
  faImage = faImage;
  faMap = faMap;

  constructor() { }

  ngOnInit(): void {
  }

}
