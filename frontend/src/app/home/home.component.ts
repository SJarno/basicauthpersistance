import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth.service';
import { AuthResponse } from '../models/AuthResponse';
import { DataService } from '../services/data.service';
import { Role } from '../models/Role';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'Demo';
  greeting?: any;
  userData?: any;
  url: string = environment.baseUrl;
  //user?: AuthResponse;
  userName: any;

  constructor(private authService: AuthService, private http: HttpClient, private dataService: DataService) { }

  ngOnInit(): void {
    this.userName = this.getUserName();
    this.http.get(`${this.url}resource`).subscribe(data => this.greeting = data);
    this.getUserData();


  }
  isAuthenticated(): boolean | undefined {
    return this.authService.user?.authenticated;
  
  }
  getUserName() {
    return this.authService.user?.username;
  }
  getUserRoles(): Role[] | undefined{
    console.log('Authorities ==', this.authService.user?.roles);
    return this.authService.user?.roles;
  }
  getUserData() {
    console.log('Role at this point ',this.getUserName());
    this.dataService.getUserPathData().subscribe(resp => this.userData = resp);
  }

}
