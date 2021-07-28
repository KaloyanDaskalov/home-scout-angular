import { Injectable } from '@angular/core';
// import { User } from "../shared/interfaces/user";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  currentUser: any = null; // Save logged in user data

  constructor(
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    private router: Router
  ) {
    // Observable for current user
    this.afAuth.onAuthStateChanged(user => {
        this.currentUser = user;
        console.log('auth state');
    });
  }
  
  // Sign up with email/password
  SignUp(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('sign up');
        this.router.navigate(['advertisements']);
      }).catch((error) => {
        console.log(error);
      })
  }

  // Sign in with email/password
  SignIn(email:string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('sign in');
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
    return this.afAuth.signOut().then(console.log);
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    return !!this.currentUser;
  }

  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */

  // SetUserData(user) {
  //   const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
  //   const userData: User = {
  //     uid: user.uid,
  //     email: user.email,
  //     displayName: user.displayName,
  //     photoURL: user.photoURL,
  //     emailVerified: user.emailVerified
  //   }
  //   return userRef.set(userData, {
  //     merge: true
  //   })
  // }
}
