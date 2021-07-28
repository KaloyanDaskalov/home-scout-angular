import { Component, OnInit } from '@angular/core';
import { AdvertisementService } from '../advertisement.service';
import { Advertisement } from '../shared/interfaces/advertisement';
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
      this.retrieveAdvertisements(params.search);
    });
  }
  
  retrieveAdvertisements(query:string = ''): void {
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
    });
  }
}
