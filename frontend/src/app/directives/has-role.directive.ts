import { Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthResponse } from '../models/AuthResponse';
import { Role } from '../models/Role';
import { AuthService } from '../services/auth.service';

@Directive({
  selector: '[hasRole]'
})
export class HasRoleDirective implements OnDestroy{

  private user?: AuthResponse;
  private role?: boolean;

  constructor(private authService: AuthService,
    private viewContainer: ViewContainerRef,
    private templateRef: TemplateRef<any>) { }

  ngOnDestroy(): void {
    this.authService.userSubject.unsubscribe();
  }

  @Input()
  set hasRole(role: string) {
    this.authService.userSubject.subscribe(user => {
      this.user = user;
      this.role = this.checkRole(role);
      this.updateView();
    });
  }
  private checkRole(role: string) {
    const roles: Role[] | undefined = this.user?.roles;
    return roles?.some(r => r.authority == role) || false;
  }
  private updateView() {
    this.viewContainer.clear();
    if (this.role) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }

}
