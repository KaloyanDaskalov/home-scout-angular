import { Component, OnInit } from '@angular/core';
import { AdvertisementService } from '../advertisement.service';
import { Advertisement } from '../interfaces/advertisement';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  advertisements: Advertisement[] = [] ; 

  constructor(private advertisementService: AdvertisementService) { }

  ngOnInit(): void {
    this.retrieveAdvertisements();
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
}
