import { AuthServiceService } from './auth-service.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthguardServiceService {

  
  constructor(private authS: AuthServiceService, private router: Router) { }



  canActivate():boolean{
    if(!this.authS.loggedIn()){this.router.navigate(['/sign-in']);}
return this.authS.loggedIn();


  }

}
