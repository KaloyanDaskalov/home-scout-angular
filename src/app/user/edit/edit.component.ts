import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faHome,faDollarSign, faImage, faMap, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { map } from 'rxjs/operators';
import { AdvertisementService } from 'src/app/advertisement.service';
import { LoaderService } from 'src/app/shared/loader/loader.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  formData!: FormGroup;
  types: string[]= ['house', 'flat', 'office', 'land' ];
  imagePattern : RegExp = /^https?:\/\//;
  faHome = faHome;
  faDollarSign = faDollarSign;
  faImage = faImage;
  faMap = faMap;
  faInfoCircle = faInfoCircle;

  constructor(
    private activatedRoute: ActivatedRoute,
    private advertisementService: AdvertisementService,
    private formBuilder: FormBuilder,
    private loaderService: LoaderService
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params.id || '';

    this.formData =  this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      price: ['' ,[Validators.required, Validators.min(1), Validators.max(5000000)]],
      imageUrl: ['', [Validators.required, this.checkImage.bind(this)]],
      address: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      type: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(500)]]
    });

    this.retrieveMyAdvertisement(id);
  }
  
    retrieveMyAdvertisement(id: string): void {
      this.loaderService.isLoading.next(true);
  
      this.advertisementService.getOne(id).snapshotChanges()
      .pipe(
        map(obj => ({ id: obj.payload.key, ...obj.payload.val() }) )
      )
      .subscribe(data => {
        const {title, price, imageUrl, address, type, description} = data;
        this.loaderService.isLoading.next(false);
        this.formData.patchValue({title, price, imageUrl, address, type, description});
      });
    }
  
    onSubmit () {
      if (this.formData.invalid) { return; }
      //Patch updated advertisement
      console.log('Created new item successfully!');
    }

  checkImage(control: FormControl): {[key:string]: boolean} | null {
    if (!this.imagePattern.test(control.value)) {
      return {'invalidImageUrl': true}
    }
    return null;
  }

}
