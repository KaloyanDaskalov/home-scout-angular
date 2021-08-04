import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { AdvertisementService } from 'src/app/advertisement.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Advertisement } from 'src/app/shared/interfaces/advertisement';
import { User } from 'src/app/shared/interfaces/user';
import { LoaderService } from 'src/app/shared/loader/loader.service';

@Component({
  selector: 'app-my-advertisements',
  templateUrl: './my-advertisements.component.html',
  styleUrls: ['./my-advertisements.component.css']
})
export class MyAdvertisementsComponent implements OnInit {

  advertisements: Advertisement[] = [];

  get currentUser (): User | null{
    return this.authService.getCurrentUser
  }

  constructor(
    private advertisementService: AdvertisementService,
    private authService: AuthService,
    private loaderService: LoaderService
    ) { }

  ngOnInit(): void {
    this.retrieveMyAdvertisements(this.currentUser?.uid);
  }
  
  retrieveMyAdvertisements(authorId:string = ''): void {
    this.loaderService.isLoading.next(true);

    this.advertisementService.getByChild('authorId', authorId).snapshotChanges()
    .pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.key, ...c.payload.val() })
        )
      )
    )
    .subscribe(data => {
      this.advertisements = data;
      this.loaderService.isLoading.next(false);
    });
  }

}
