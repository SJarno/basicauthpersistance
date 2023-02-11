import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TemplateRef, ViewContainerRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AuthResponse } from '../models/AuthResponse';
import { Role } from '../models/Role';
import { AuthService } from '../services/auth.service';
import { HasRoleDirective } from './has-role.directive';

describe('HasRoleDirective', () => {
  let authService: AuthService;
  let viewContainerRef: ViewContainerRef;
  let templateRef: TemplateRef<any>;
  let directive: HasRoleDirective;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [AuthService]
    });
    authService = TestBed.inject(AuthService);
    viewContainerRef = jasmine.createSpyObj<ViewContainerRef>('ViewContainerRef', ['clear', 'createEmbeddedView']);
    templateRef = jasmine.createSpyObj<TemplateRef<any>>('TemplateRef', ['createEmbeddedView']);
    directive = new HasRoleDirective(authService, viewContainerRef, templateRef);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });
  it('should call viewContainerRef.clear and viewContainerRef.createEmbeddedView', () => {
    
    directive.hasRole = 'ADMIN';
    const role = 'ADMIN';
    directive.hasRole = role;
    expect(directive['role']).toEqual(false);
    
  });
  it('should check the role correctly', () => {
    const role = 'ADMIN';
    directive['user'] = {
      roles: [{ authority: 'ADMIN' } as Role]
    } as AuthResponse;
    const result = directive['checkRole'](role);
    expect(result).toEqual(true);
  });
});
