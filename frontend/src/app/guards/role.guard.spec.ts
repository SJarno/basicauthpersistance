import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject, of } from 'rxjs';
import { UserComponent } from '../components/user/user.component';
import { HomeComponent } from '../home/home.component';
import { AuthResponse } from '../models/AuthResponse';
import { AuthService } from '../services/auth.service';

import { RoleGuard } from './role.guard';

describe('RoleGuard', () => {
  let guard: RoleGuard;
  let authService: jasmine.SpyObj<AuthService>;
  let route: Router;
  const expectedUser: AuthResponse = {
    username: 'user',
    authenticated: true,
    roles: [{ authority: 'ROLE_USER' }]
  }
  const routes: Routes = [
    { path: 'home', component: HomeComponent },
    {
      path: 'user-page',
      component: UserComponent,
      canActivate: [RoleGuard],
      data: { role: 'ROLE_USER' }
    }
  ];

  beforeEach(() => {
    authService = jasmine.createSpyObj('AuthService', ['authenticate']);
    authService.userSubject = new BehaviorSubject<AuthResponse>(expectedUser);
    authService.user = expectedUser;
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule.withRoutes(routes)],
      providers: [RoleGuard,
        { provide: AuthService, useValue: { authService } }
      ]
    })

    //guard = TestBed.inject(RoleGuard);
    guard = new RoleGuard(authService, route);

  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
  /* it('should return true if the user is authenticated and has the required role', () => {
    authService.authenticate.and.returnValue(of({ authenticated: true, roles: [{ authority: 'ROLE_USER' }] }));

    const dummyRoute = Object.assign(new ActivatedRouteSnapshot(), { data: { role: 'ROLE_USER' } });

    const dummyState = {} as RouterStateSnapshot;

    const result = guard.canActivate(dummyRoute, dummyState);

    expect(result).toEqual(true);
  }); */
  
});
