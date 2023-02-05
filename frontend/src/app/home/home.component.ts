import { HttpClient } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth.service';
import { AuthResponse } from '../models/AuthResponse';
import { DataService } from '../services/data.service';
import { Role } from '../models/Role';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  title = 'Demo';
  greeting?: any;
  userData?: any;
  url: string = environment.baseUrl;
  user?: AuthResponse;
  userSubscription?: Subscription;

  constructor(private authService: AuthService, private http: HttpClient, private dataService: DataService) { }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.userSubscription = this.authService.userSubject.subscribe(user => {
      this.user = user;
      if (this.user?.authenticated) {
        this.http.get(`${this.url}resource`).subscribe(data => this.greeting = data);
        this.getUserData();
      }
    });

  }

  isAuthenticated(): boolean | undefined {
    return this.user?.authenticated;

  }
  getUserName(): string | undefined {
    return this.user?.username;
  }
  getUserRoles(): Role[] | undefined {
    return this.user?.roles;
  }
  getUserData(): void {
    this.dataService.getUserPathData().subscribe(resp => this.userData = resp);
  }

}
