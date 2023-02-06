import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TemplateRef, ViewContainerRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AuthService } from '../services/auth.service';
import { HasRoleDirective } from './has-role.directive';

describe('HasRoleDirective', () => {
  let authService: AuthService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [AuthService]
    });
    authService = TestBed.inject(AuthService);
  });

  it('should create an instance', () => {
    const viewContainerRef = jasmine.createSpyObj<ViewContainerRef>('ViewContainerRef', ['clear', 'createEmbeddedView']);
    const templateRef = jasmine.createSpyObj<TemplateRef<any>>('TemplateRef', ['createEmbeddedView']);
    const directive = new HasRoleDirective(authService, viewContainerRef, templateRef);
    expect(directive).toBeTruthy();
  });
});
