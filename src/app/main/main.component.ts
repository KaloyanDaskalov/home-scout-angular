import { Component, OnInit } from '@angular/core';
import { AdvertisementService } from '../advertisement.service';
import { Advertisement } from '../interfaces/advertisement';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  advertisements?: Advertisement[]; 

  constructor(
    private advertisementService: AdvertisementService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      if(params.search) {
        return this.retrieveQueryAdvertisements(params.search);
      }
      return this.retrieveAdvertisements();
    });
  }

  retrieveAdvertisements(): void {
    this.advertisementService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.advertisements = data;
    });
  }

  retrieveQueryAdvertisements(query:string = ''): void {
    this.advertisementService.getAll().snapshotChanges()
    .pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.key, ...c.payload.val() })
        ).filter(x => x.title?.toLocaleLowerCase().includes(query.toLocaleLowerCase()))
        )
    )
    .subscribe(data => {
      this.advertisements = data;
    });
  }
}
