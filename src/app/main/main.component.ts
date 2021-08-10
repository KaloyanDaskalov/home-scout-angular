import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, take } from 'rxjs/operators';

import { AdvertisementService } from '../advertisement.service';
import { Advertisement } from '../shared/interfaces/advertisement';
import { LoaderService } from '../shared/loader/loader.service';
import { AuthService } from '../auth/auth.service';
import { GlobalMessagesService } from '../shared/global-messages/global-messages.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  advertisements: Advertisement[] = []; 
  get currentUser () {
    return this.authService.getCurrentUser;
  }

  constructor(
    private advertisementService: AdvertisementService,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private loaderService: LoaderService,
    private globalMessages: GlobalMessagesService
    ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      if(params.type) {
        this.retrieveAdvertisementsByType(params.type)
      } else {
        this.retrieveAdvertisements(params.search);
      }
    });
  }
  
  retrieveAdvertisements(query:string = ''): void {
      this.loaderService.isLoading.next(true);

    this.advertisementService.getAll().snapshotChanges()
    .pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.key, ...c.payload.val() })
        )
      )
    )
    .subscribe(data => {
      if(query){
        data = data.filter(x => x.title?.toLocaleLowerCase().includes(query.toLocaleLowerCase()));
      } 
      this.advertisements = data;
      this.loaderService.isLoading.next(false);
    });
  }
  
  retrieveAdvertisementsByType(type:string = ''): void {
      this.loaderService.isLoading.next(true);

    this.advertisementService.getByChild('type', type).snapshotChanges()
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

  onFavoritesEmit (id: string) {

    if (!this.currentUser) { 
      this.globalMessages.isMessage.next({message: 'You must be logged in to perform this action', type: 'bg-danger'});
      this.router.navigate(['/auth/login']);
      return; 
    }
    
    this.advertisementService.getOne(id).valueChanges()
    .pipe(take(1))
    .subscribe(adv => {
      
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
      });
    
  }
}
