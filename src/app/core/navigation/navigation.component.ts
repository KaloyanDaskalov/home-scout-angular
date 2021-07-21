import { Component, OnInit } from '@angular/core';
import { faUser, faSort } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  
  faUser = faUser;
  faSort = faSort;
  
  constructor() { }

  ngOnInit(): void {
  }

}
