import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService } from './services/auth.service';
import { AuthResponse } from './models/AuthResponse';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Demo';
  greeting: any = {};
  //user?: AuthResponse;

  constructor(private app: AuthService) {

  }
  ngOnInit() {
    console.log('1.Authenticating on top level')
    this.app.authenticate(undefined, undefined).subscribe();
    
  }
  isAuthenticated() {
    console.log('4.After auth sub == ',this.app.user);
    return this.app.user?.authenticated;
    
  }

}
