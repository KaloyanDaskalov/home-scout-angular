import { Component } from '@angular/core';
import {  Router } from '@angular/router';
import { faUser, faFilter } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  
  faUser = faUser;
  faFilter = faFilter;
  
  get isLogged(): boolean {
    return this.authService.isLoggedIn;
  } 
  get user(): string {
    return this.authService.getUser;
  };

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
