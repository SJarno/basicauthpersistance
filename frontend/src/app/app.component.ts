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

  constructor(private authService: AuthService) {

  }
  ngOnInit() {
    console.log('1.Authenticating on top level')
    this.authService.authenticate(undefined, undefined).subscribe();
    
  }

}
