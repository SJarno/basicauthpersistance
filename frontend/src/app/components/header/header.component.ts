import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Role } from 'src/app/models/Role';
import { AuthResponse } from 'src/app/models/AuthResponse';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input()
  title?: string;
  user?: AuthResponse;
  userSubscription?: Subscription;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.userSubscription = this.authService.userSubject.subscribe(user => {
      this.user = user;
    });
  }
  logout() {
    const logoutResult = this.authService.logout();
    console.log('Logout result == ', logoutResult);
    if (logoutResult) {
      //this.user = undefined;
      this.router.navigateByUrl('/login');
    }
  }
  /* isAuthenticated() {
    return this.user?.authenticated;
  } */
  /* hasRole(role: string) {
    const roles: Role[] | undefined = this.user?.roles;
    return roles?.some(r => r.authority == role) || false;

  } */

}
