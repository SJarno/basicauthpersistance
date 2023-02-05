import { Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthResponse } from '../models/AuthResponse';
import { AuthService } from '../services/auth.service';

@Directive({
  selector: '[isAuthenticated]'
})
export class IsAuthenticatedDirective implements OnDestroy{

  private user?: AuthResponse;
  private authenticated: boolean = false;
  

  constructor(private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService) { }

  ngOnDestroy(): void {
    this.authService.userSubject.unsubscribe();
  }

  @Input()
  set isAuthenticated(authNeeded: boolean) {
    this.authService.userSubject.subscribe((user: AuthResponse) => {
      this.user = user;
      this.authenticated = user.authenticated;
      this.updateView(authNeeded);
    });
  }
  private updateView(authenticated: boolean) {
    if (authenticated) {
      this.displayIfAuthenticated();
    } else {
      this.displayIfNotAuthenticatd();
    }
  }
  private displayIfAuthenticated() {
    this.viewContainer.clear();
    if (this.authenticated) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
  private displayIfNotAuthenticatd() {
    this.viewContainer.clear();
    if (!this.authenticated) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}
