import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faHome,faDollarSign, faImage, faMap, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/auth/auth.service';
import { GlobalMessagesService } from 'src/app/shared/global-messages/global-messages.service';
import { AdvertisementService } from '../../advertisement.service';
import { Advertisement } from '../../shared/interfaces/advertisement';
import { User } from '../../shared/interfaces/user';

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

  get currentUser (): User | null {
    return this.authService.getCurrentUser;
  }

  constructor(
    private advertisementService: AdvertisementService,
    private authService: AuthService,
    private globalMessages :GlobalMessagesService
    ) { }

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
    if (this.formData.invalid || !this.currentUser) { return; }

    this.data = { ...this.formData.value, author: this.currentUser?.email, authorId: this.currentUser?.uid };

    this.advertisementService.create(this.data).then(() => {
      this.formData.reset();
      this.globalMessages.isMessage.next({message: 'New advertisement created', type: 'bg-success'})
  });
  }
}
