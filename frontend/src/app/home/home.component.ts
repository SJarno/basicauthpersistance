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

  constructor(private app: AuthService, private http: HttpClient, private dataService: DataService) { }

  ngOnInit(): void {
    this.http.get(`${this.url}resource`).subscribe(data => this.greeting = data);
    this.getUserData();


  }
  isAuthenticated(): boolean | undefined {
    return this.app.user?.authenticated;
  
  }
  getUserName() {
    return this.app.user?.name;
  }
  getUserRoles(): Role[] | undefined{
    console.log('Authorities ==', this.app.user?.roles);
    return this.app.user?.roles;
  }
  getUserData() {
    console.log('Role at this point ',this.getUserName());
    this.dataService.getUserPathData().subscribe(resp => this.userData = resp);
  }

}
