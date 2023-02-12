import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { first, map, Observable } from 'rxjs';
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
    state: RouterStateSnapshot): Observable<boolean> {

    const requiredRole = next.data['role'];

    return this.authService.authenticate(undefined).pipe(
      first(),
      map((user: AuthResponse) => {
        if (!user.authenticated) {
          this.router.navigate(['/']);
          return false;
        }
        const roles: Role[] | undefined = user.roles;
        const hasRole = roles?.some(r => r.authority == requiredRole) || false;
        if (!hasRole) {
          this.router.navigate(['/']);
          return false;

        }
        return true;
      })
    )
  }

}
