import { HttpClientModule } from '@angular/common/http';
import { TemplateRef, ViewContainerRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { AuthResponse } from '../models/AuthResponse';
import { AuthService } from '../services/auth.service';
import { IsAuthenticatedDirective } from './is-authenticated.directive';

describe('IsAuthenticatedDirective', () => {
  let directive: IsAuthenticatedDirective;
  let authService: AuthService;
  let viewContainerRef: ViewContainerRef;
  let templateRef: TemplateRef<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [AuthService, ViewContainerRef, { provide: TemplateRef, useValue: {} }]
    });
    authService = TestBed.inject(AuthService);
    viewContainerRef = jasmine.createSpyObj<ViewContainerRef>('ViewContainerRef', ['clear', 'createEmbeddedView']);
    templateRef = jasmine.createSpyObj<TemplateRef<any>>('TemplateRef', ['createEmbeddedView']);
    directive = new IsAuthenticatedDirective(templateRef, viewContainerRef, authService);
  });
  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });
  it('should call viewContainer.clear and viewContainer.createEmbeddedView', () => {
    directive['user'] = { authenticated: true } as AuthResponse;
    directive.isAuthenticated = true;

    expect(viewContainerRef.clear).toHaveBeenCalledTimes(1);
    //expect(templateRef.createEmbeddedView).toHaveBeenCalledTimes(1);
  });

});
