import { HttpClientModule } from '@angular/common/http';
import { TemplateRef, ViewContainerRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
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
      viewContainerRef = TestBed.inject(ViewContainerRef);
      templateRef = TestBed.inject(TemplateRef);
      directive = new IsAuthenticatedDirective(templateRef, viewContainerRef, authService);
    });
  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });
});
