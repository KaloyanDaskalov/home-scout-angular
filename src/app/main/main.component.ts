import { Component, OnInit } from '@angular/core';
import { AdvertisementService } from '../advertisement.service';
import { Advertisement } from '../shared/interfaces/advertisement';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { LoaderService } from '../shared/loader/loader.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  advertisements: Advertisement[] = []; 

  constructor(
    private advertisementService: AdvertisementService,
    private activatedRoute: ActivatedRoute,
    private loaderService: LoaderService
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

    this.advertisementService.getByType(type).snapshotChanges()
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
