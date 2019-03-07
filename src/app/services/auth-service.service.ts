import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  user: firebase.User;
  constructor(private router: Router, private afAuth: AngularFireAuth) {

    afAuth.authState.subscribe((user)=>{
      if(user){
        this.user=user;
        localStorage.setItem('user',JSON.stringify(user));
      }
      else{
        this.user=null;
        localStorage.setItem('user',null);
      }
    })

  }


  login(email: string, password: string) {
    console.log(email, password);
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.afAuth.auth.signOut();
  }

  loggedIn():boolean{
    return JSON.parse(localStorage.getItem('user'))!=null;
  }

  
  getCurrentState() {
    return this.user;
  }




   getCurrentUser()
   {
     return this.user;
   }




}
