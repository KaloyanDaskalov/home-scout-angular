import { Component, Input } from '@angular/core';
import { faHeart, faMapMarkerAlt, faEuroSign, faHome } from '@fortawesome/free-solid-svg-icons';
import { Advertisement } from 'src/app/shared/interfaces/advertisement';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() advertisementCard!: Advertisement;
  faHeart = faHeart;
  faMapMarkerAlt = faMapMarkerAlt;
  faEuroSign = faEuroSign;
  faHome = faHome;
  btnDetails: string = 'Read More';
  showDetails: boolean = false;

  constructor() { }

  onClick() {
    this.showDetails = !this.showDetails;
    this.btnDetails = this.showDetails ? 'Show Less' : 'Read More';
  }

  onFavorites (cardId: any) {
    console.log(cardId);
  }
}
