import { RoleGuard } from './role.guard';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthResponse } from '../models/AuthResponse';
import { Role } from '../models/Role';
import { async, first, from, of } from 'rxjs';

describe('RoleGuard', () => {
  let guard: RoleGuard;
  let authService: jasmine.SpyObj<AuthService>;
  let router: Router;

  beforeEach(() => {
    authService = jasmine.createSpyObj('AuthService', ['authenticate']);
    router = jasmine.createSpyObj('Router', ['navigate']);
    guard = new RoleGuard(authService, router);
  });

  it('should return true if the user is authenticated and has the required role', () => {
    const dummyRoute = Object.assign(new ActivatedRouteSnapshot(), { data: { role: 'ROLE_USER' } });
    const dummyState = {} as RouterStateSnapshot;


    authService.authenticate.and.returnValue(of({ authenticated: true, roles: [{ authority: 'ROLE_USER' }] } as AuthResponse));

    const result = guard.canActivate(dummyRoute, dummyState);
    result.subscribe(result => {
      expect(result).toEqual(true);
      expect(authService.authenticate).toHaveBeenCalledTimes(1);
    });
  });



  it('should return false if the user is not authenticated', () => {
    const dummyRoute = Object.assign(new ActivatedRouteSnapshot(), { data: { role: 'ROLE_USER' } });
    const dummyState = {} as RouterStateSnapshot;

    authService.authenticate.and.returnValue(of({ username: 'user', authenticated: false, roles: [] } as AuthResponse));

    const result = guard.canActivate(dummyRoute, dummyState);
    result.subscribe(result => {
      expect(result).toEqual(false);
      expect(authService.authenticate).toHaveBeenCalledTimes(1);
    });
  });

  it('should return false if the user is authenticated but does not have the required role', () => {
    const dummyRoute = Object.assign(new ActivatedRouteSnapshot(), { data: { role: 'ROLE_ADMIN' } });
    const dummyState = {} as RouterStateSnapshot;

    authService.authenticate.and.returnValue(of({ username: 'user', authenticated: true, roles: [{ authority: 'ROLE_USER' }] } as AuthResponse));
    const result = guard.canActivate(dummyRoute, dummyState);
    result.subscribe(result => {
      expect(result).toEqual(false);
      expect(authService.authenticate).toHaveBeenCalledTimes(1);
    });
  });
});
