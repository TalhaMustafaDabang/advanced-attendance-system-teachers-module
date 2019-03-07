import { AuthServiceService } from './../services/auth-service.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(public authS: AuthServiceService, private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    })
  }

  ngOnInit() {
  }

  signin(value: any) {
    this.authS.login(value.email, value.password).then((user) => {
      this.router.navigate(['landing',value.email]);
    })
      .catch((e) => {
        alert(e.message);
      })
  }

}
