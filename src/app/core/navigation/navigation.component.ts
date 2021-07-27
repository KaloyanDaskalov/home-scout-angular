import { Component } from '@angular/core';
import {  Router } from '@angular/router';
import { faUser, faSort } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  
  faUser = faUser;
  faSort = faSort;
  
  constructor( 
    private router: Router,
    private authService: AuthService
    ) { }

  onSearch( inputEl: HTMLInputElement) {
    this.router.navigate(['/advertisements'], {queryParams: {search: inputEl.value}});
  }

  onLogout() {
    this.authService.SignOut();
  }

}
