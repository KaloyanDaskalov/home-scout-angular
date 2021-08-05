import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { faMapMarkerAlt, faEuroSign, faHome } from '@fortawesome/free-solid-svg-icons';
import { AdvertisementService } from 'src/app/advertisement.service';
import { Advertisement } from 'src/app/shared/interfaces/advertisement';
import { LoaderService } from 'src/app/shared/loader/loader.service';

@Component({
  selector: 'app-my-card',
  templateUrl: './my-card.component.html',
  styleUrls: ['./my-card.component.css']
})
export class MyCardComponent {

  @Input() advertisementCard!: Advertisement;
  faMapMarkerAlt = faMapMarkerAlt;
  faEuroSign = faEuroSign;
  faHome = faHome;

  constructor(
    private advertisementService: AdvertisementService,
    private loaderService: LoaderService
  ) { }

  onDelete (id: string | null | undefined) {
      this.loaderService.isLoading.next(true);
      this.advertisementService.delete(id as string).then();
      this.loaderService.isLoading.next(false);
  }
}
