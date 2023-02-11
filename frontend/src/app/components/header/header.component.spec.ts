import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { HomeComponent } from 'src/app/home/home.component';
import { LoginComponent } from 'src/app/login/login.component';
import { AuthResponse } from 'src/app/models/AuthResponse';
import { AuthService } from 'src/app/services/auth.service';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let logoutSpy: jasmine.Spy;
  let router: Router;
  let navigateSpy: jasmine.Spy<jasmine.Func>;

  const expectedUser: AuthResponse = {
    username: 'user',
    authenticated: true,
    roles: [{ authority: 'ROLE_USER' }]
  }
  const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
  ];

  beforeEach(async () => {
    authService = jasmine.createSpyObj('AuthService', ['logout']);
    logoutSpy = authService.logout.and.returnValue(true);
    authService.userSubject = new BehaviorSubject<AuthResponse>(expectedUser);
    authService.user = expectedUser;

    await TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule.withRoutes(routes)],
      declarations: [HeaderComponent],
      providers: [
        { provide: AuthService, useValue: authService }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    navigateSpy = spyOn(router, 'navigate');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the logout method on logout', () => {
    
    spyOn(component, 'logout').and.callThrough();
    expect(component.user?.authenticated).toEqual(true);

    const logoutButton = fixture.debugElement.query(By.css('li:last-child a'));
    if (component.user && component.user?.authenticated) {
      expect(logoutButton).toBeTruthy();
      logoutButton.triggerEventHandler('click', null);
      fixture.detectChanges();

      component.logout();
      expect(authService.logout).toHaveBeenCalled();
      expect(component.logout).toHaveBeenCalled();
      expect(authService.logout).toHaveBeenCalled();
      
    } else {
      expect(logoutButton).toBeFalsy();
      expect(component.user).toEqual(undefined);
    }

    //expect(component.userSubscription).toEqual(undefined);
  });
  it('should only display logout button if the user is authenticated', () => {

  });
});
