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
  credentials = { username: '', password: '' };
  constructor(private authService: AuthService, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {

  }
  login() {
    this.authService.authenticate(this.credentials).subscribe((auth: AuthResponse) => {
      if (auth) {
        this.error = false;
        this.router.navigateByUrl('/home');
      } else {
        this.error = true;
      }

    });

  }

}
