import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faHome,faDollarSign, faImage, faMap, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { AdvertisementService } from '../../advertisement.service';
import { Advertisement } from '../../shared/interfaces/advertisement';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  data!: Advertisement;
  types: string[]= ['house', 'flat', 'office', 'land' ];
  imagePattern : RegExp = /^https?:\/\//;
  canSubmit: boolean = false;
  formData!: FormGroup;
  faHome = faHome;
  faDollarSign = faDollarSign;
  faImage = faImage;
  faMap = faMap;
  faInfoCircle = faInfoCircle;

  constructor(private advertisementService: AdvertisementService) { }

  ngOnInit(): void {
    this.formData = new FormGroup({
      title: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
      price: new FormControl(null,[Validators.required, Validators.min(1), Validators.max(5000000)]),
      imageUrl: new FormControl(null, [Validators.required, this.checkImage.bind(this)]),
      address: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
      type: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required, Validators.minLength(20), Validators.maxLength(500)])
    });
    this.formData.statusChanges.subscribe(status => {
      if(status === 'VALID') this.canSubmit = true;
    });
  }

  checkImage(control: FormControl): {[key:string]: boolean} | null {
    if (!this.imagePattern.test(control.value)) {
      return {'invalidImageUrl': true}
    }
    return null;
  }

  onSubmit () {
    this.data = this.formData.value;
    this.advertisementService.create(this.data).then(() => {
      console.log('Created new item successfully!', this.data);
      //TODO clear form and create global info/error 
  })
  }
}