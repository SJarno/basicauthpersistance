import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { HomeComponent } from '../home/home.component';
import { AuthResponse } from '../models/AuthResponse';
import { AuthService } from '../services/auth.service';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: Router;
  let navigateSpy: jasmine.Spy<jasmine.Func>;

  const expectedUser: AuthResponse = {
    username: 'user',
    authenticated: true,
    roles: [{ authority: 'ROLE_USER' }]
  };

  const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
  ];

  beforeEach(async () => {
    authService = jasmine.createSpyObj('AuthService', ['authenticate']);
    

    await TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule.withRoutes(routes)],
      declarations: [LoginComponent],
      providers: [{ provide: AuthService, useValue: authService }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    navigateSpy = spyOn(router, 'navigate');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the login method when the form is submitted', () => {
    authService.authenticate.and.returnValue(of(expectedUser));
    spyOn(component, 'login').and.callThrough();

    const usernameInput = fixture.debugElement.nativeElement.querySelector('#username');
    usernameInput.value = 'user';
    usernameInput.dispatchEvent(new Event('input'));
    component.credentials.username = usernameInput.value;

    const passwordInput = fixture.debugElement.nativeElement.querySelector('#password');
    passwordInput.value = 'pass';
    passwordInput.dispatchEvent(new Event('input'));
    component.credentials.password = passwordInput.value;

    const form = fixture.debugElement.nativeElement.querySelector('form');
    form.dispatchEvent(new Event('submit'));

    fixture.detectChanges();
    expect(component.credentials).toEqual({ username: 'user', password: 'pass' });
    expect(component.login).toHaveBeenCalled();
    expect(authService.authenticate).toHaveBeenCalledWith({ username: 'user', password: 'pass' });
    expect(component.error).toEqual(false);
    
    const loginMessage = fixture.debugElement.nativeElement.querySelector('.info-login');
    expect(loginMessage.hidden).toEqual(false);
  });
  it('should handle a failed login', () => {
    spyOn(component, 'login').and.callThrough();
    authService.authenticate.and.returnValue(of(undefined));
    const usernameInput = fixture.debugElement.nativeElement.querySelector('#username');
    usernameInput.value = 'user';
    usernameInput.dispatchEvent(new Event('input'));
    component.credentials.username = usernameInput.value;

    const passwordInput = fixture.debugElement.nativeElement.querySelector('#password');
    passwordInput.value = 'wrongpass';
    passwordInput.dispatchEvent(new Event('input'));
    component.credentials.password = passwordInput.value;

    const form = fixture.debugElement.nativeElement.querySelector('form');
    form.dispatchEvent(new Event('submit'));

    fixture.detectChanges();
    expect(component.credentials).toEqual({ username: 'user', password: 'wrongpass' });
    expect(component.login).toHaveBeenCalled();
    expect(authService.authenticate).toHaveBeenCalledWith({ username: 'user', password: 'wrongpass' });
    expect(component.error).toEqual(true);

    const errorMessage = fixture.debugElement.nativeElement.querySelector('.alert-danger');
    expect(errorMessage.hidden).toEqual(false);
  });
});
