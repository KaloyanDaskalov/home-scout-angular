import { Component, OnInit } from '@angular/core';
import { faHeart, faMapMarkerAlt, faEuroSign, faHome } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  faHeart = faHeart;
  faMapMarkerAlt = faMapMarkerAlt;
  faEuroSign = faEuroSign;
  faHome = faHome;

  constructor() { }

  ngOnInit(): void {
  }

}
