import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AdvertisementService } from 'src/app/advertisement.service';
import { AuthService } from 'src/app/auth/auth.service';
import { GlobalMessagesService } from 'src/app/shared/global-messages/global-messages.service';
import { Advertisement } from 'src/app/shared/interfaces/advertisement';
import { LoaderService } from 'src/app/shared/loader/loader.service';

@Component({
  selector: 'app-my-favorites',
  templateUrl: './my-favorites.component.html',
  styleUrls: ['./my-favorites.component.css']
})
export class MyFavoritesComponent implements OnInit, OnDestroy{
  advertisements: Advertisement[] = [];
  sub!: Subscription;
  get currentUser () {
    return this.authService.getCurrentUser;
  }

  constructor(
    private advertisementService: AdvertisementService,
    private authService: AuthService,
    private router: Router,
    private loaderService: LoaderService,
    private globalMessages: GlobalMessagesService
    ) { }

  ngOnInit(): void {
    if(this.currentUser){
      this.retrieveFavorites(this.currentUser?.uid as string)
    }
  }
  
  retrieveFavorites(uid: string): void {
    this.loaderService.isLoading.next(true);

    this.sub = this.advertisementService.getAll().snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(adv =>
            ({ id: adv.key, ...adv.payload.val()  })
          )
        )
      )
      .subscribe(data => {
      
      this.advertisements = data.filter(x => x.favorites && x.favorites[uid] === true);
      
      this.loaderService.isLoading.next(false);
      })
  }

  onFavoritesEmit (id: string) {

    if (!this.currentUser) { 
      this.globalMessages.isMessage.next({message: 'You must be logged in to perform this action', type: 'bg-danger'});
      this.router.navigate(['/auth/login']);
      return; 
    }
    
    this.advertisementService.getOne(id).valueChanges()
    .pipe(take(1))
    .subscribe(adv => {
      this.loaderService.isLoading.next(true);
      
      const currentAdvertisement = adv;
      const uid = this.currentUser?.uid as string;

      if ( currentAdvertisement !== null) {

        if(currentAdvertisement?.authorId === uid) {
          
          this.globalMessages.isMessage.next({message: 'You can\'t perform this action on your   advertisement', type: 'bg-danger'});

        } else if(currentAdvertisement?.favorites === undefined) {
          
          currentAdvertisement.favorites = {[uid]: true}
          this.advertisementService.getOne(id).update(currentAdvertisement).then(()=> this.globalMessages.isMessage.next({message: 'Added to favorites', type: 'bg-success'}));

        } else if(currentAdvertisement?.favorites[uid] === undefined) {

          currentAdvertisement.favorites[uid] = true;
          this.advertisementService.getOne(id).update(currentAdvertisement).then(() => this.globalMessages.isMessage.next({message: 'Added to favorites', type: 'bg-success'}));
        } else if(currentAdvertisement?.favorites[uid] !== undefined) {
          if(Object.keys(currentAdvertisement.favorites).length === 1 ) {
            delete currentAdvertisement?.favorites;
          }else {
            delete currentAdvertisement?.favorites[uid];
          }
          this.advertisementService.getOne(id).set(currentAdvertisement).then(() => this.globalMessages.isMessage.next({message: 'Removed from favorites', type: 'bg-warning'}));
        }
      }

      this.loaderService.isLoading.next(false);
    });
    
  }

  ngOnDestroy () {
    this.sub.unsubscribe();
  }
}
