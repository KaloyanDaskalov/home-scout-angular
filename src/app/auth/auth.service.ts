import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from '@angular/router';
import { GlobalMessagesService } from '../shared/global-messages/global-messages.service';
import { User } from '../shared/interfaces/user';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private currentUser: any = null; // Save logged in user data

  constructor(
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    private globalMessages: GlobalMessagesService,
    private router: Router
  ) {
    // Observable for current user
    this.afAuth.onAuthStateChanged(user => {
        this.currentUser = user;
        console.log('auth state');
    });
  }
  
  // Sign up with email/password
  SignUp(email: string, password: string, displayName: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((usr) => {
        usr.user?.updateProfile({displayName});
        this.router.navigate(['advertisements']);
      }).catch((error) => {
        console.log(error);
      })
  }

  // Sign in with email/password
  SignIn(email:string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then(() => {
        this.router.navigate(['advertisements']);
      }).catch((error) => {
        console.log(error);
      });
  }

  // Reset Forggot password
  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
      console.log('Password reset email sent, check your inbox.');
    }).catch((error) => {
      console.log(error);
    })
  }

  // Sign out 
  SignOut() {
    this.router.navigate(['/advertisements']);
    return this.afAuth.signOut().then(_ => this.globalMessages.isMessage.next({show: true, message: 'Logged out', type: 'bg-success'}));
  }

  // Returns true when user is looged
  get isLoggedIn(): boolean {
    return !!this.currentUser;
  }

  // Returns displayName
  get getUser(): string {
    return this.currentUser?.displayName || '';
  }

  // Returns current user
  get getCurrentUser(): User | null {
    return this.currentUser ? 
    this.currentUser
    : null;
  }
}
