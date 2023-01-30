import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Role } from 'src/app/models/Role';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input()
  title?: string;
  //user?: AuthResponse;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {

  }
  logout() {
    const logoutResult = this.authService.logout();
    console.log('Logout result == ', logoutResult);
    if (logoutResult) {
      this.router.navigateByUrl('/login');
    }
  }
  isAuthenticated() {
    return this.authService.user?.authenticated;
  }
  hasRole(role: string) {
    const roles: Role[] | undefined = this.authService.user?.roles;
    return roles?.some(r => r.authority == role) || false;

  }

}
