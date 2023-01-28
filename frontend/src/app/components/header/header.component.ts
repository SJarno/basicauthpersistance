import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AuthResponse } from 'src/app/models/AuthResponse';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user?: AuthResponse;
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

}
