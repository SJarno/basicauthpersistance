import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthResponse } from '../models/AuthResponse';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  error = false;
  credentials = {username: '', password: ''};
  constructor(private authService: AuthService, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    
  }
  login() {
  this.authService.authenticate(this.credentials, () => {
      this.router.navigateByUrl('/');
    }).subscribe((auth: AuthResponse) => {
      console.log('Login ==',auth);
      if (auth == undefined) {
        this.error = true;
        this.authService.user = undefined;
      } else {
        this.error = false;
        this.authService.user = auth;
        this.router.navigateByUrl('/home');
      }
      
    });
    console.log('result after login ==', this.authService.user);
    //return false;
  }

}
