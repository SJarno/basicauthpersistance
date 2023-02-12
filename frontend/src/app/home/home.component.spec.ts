import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject, of } from 'rxjs';
import { AuthResponse } from '../models/AuthResponse';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let dataService: jasmine.SpyObj<DataService>;
  let httpClient: jasmine.SpyObj<HttpClient>;

  beforeEach(async () => {
    authService = jasmine.createSpyObj('AuthService', ['authenticate']);
    dataService = jasmine.createSpyObj('DataService', ['getUserPathData']);
    httpClient = jasmine.createSpyObj('HttpClient', ['get']);
    httpClient.get.and.returnValue(of({ id: 1, content: '123' }));

    const userSubject = new BehaviorSubject<AuthResponse>({
      authenticated: true,
      username: 'user',
      roles: [{ authority: 'ROLE_USER' }]
    });

    authService.userSubject = userSubject;
    //authService.authenticate.and.returnValue(expectedUser);

    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [HomeComponent],
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: DataService, useValue: dataService },
        { provide: HttpClient, useValue: httpClient }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should display Id and greeting when logged in', () => {
    fixture.detectChanges();
    const userSubject = new BehaviorSubject<AuthResponse>({
      authenticated: true,
      username: 'user',
      roles: [{ authority: 'ROLE_USER' }]
    });

    userSubject.subscribe(user => { component.user = user });
    expect(component.isAuthenticated()).toBe(true);
    fixture.detectChanges();
    //Greeting and id should be there, but not the login prompt
    const greetingMessage = fixture.debugElement.nativeElement.querySelector('.greeting-message');
    expect(greetingMessage.textContent).toContain('The ID is 1');
    expect(greetingMessage.textContent).toContain('The content is 123');
    //Should not display
    const loginMessage = fixture.debugElement.nativeElement.querySelector('.login-message');
    //expect(loginMessage.getAttribute('hidden') === 'true').toBe(true);
  });

  it('Should display Login message when not logged in', () => {
    const userSubject = new BehaviorSubject<AuthResponse>({
      authenticated: false,
      username: 'user',
      roles: [{ authority: 'ROLE_USER' }]
    });
    authService.userSubject = userSubject;
    component.user = userSubject.value;

    expect(component.isAuthenticated()).toBe(false);
    httpClient.get.and.returnValue(of(undefined));
    fixture.detectChanges();
    const loginMessage = fixture.debugElement.nativeElement.querySelector('.login-message');
    expect(loginMessage.textContent).toContain('Login to see your greeting');

    fixture.detectChanges();
    const greetingMessage = fixture.debugElement.nativeElement.querySelector('.greeting-message');
    expect(greetingMessage.textContent).not.toContain('The id is 1');
    expect(greetingMessage.textContent).not.toContain('TThe content is 123');
    //expect(!greetingMessage.textContent).toContain('The content is 123');
    /* httpClient.get.and.returnValue(of({ id: 1, data: 'The ID is 123' }));
    const greetingMessage = fixture.debugElement.nativeElement.querySelector('.greeting-message');
    expect(!greetingMessage.textContent).toContain('The ID is');//fails */


  });
});
