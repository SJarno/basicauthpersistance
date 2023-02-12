import { Injectable, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { catchError, first, map, Observable } from 'rxjs';
import { AuthResponse } from '../models/AuthResponse';
import { Role } from '../models/Role';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const requiredRole = next.data['role'];

    return this.authService.authenticate(undefined).pipe(
      first(),
      map((user: AuthResponse) => {
        if (user.authenticated) {
          const roles: Role[] | undefined = user.roles;
          return roles?.some(r => r.authority == requiredRole) || false;
        } else {
          this.router.navigate(['/']);
          return false;
        }
      })
    )
  }

}
