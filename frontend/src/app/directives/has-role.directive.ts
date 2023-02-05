import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthResponse } from '../models/AuthResponse';
import { Role } from '../models/Role';
import { AuthService } from '../services/auth.service';

@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective {

  private user?: AuthResponse;
  private hasRole?: boolean;

  constructor(private authService: AuthService,
    private viewContainer: ViewContainerRef,
    private templateRef: TemplateRef<any>) { }

  @Input()
  set appHasRole(role: string) {
    console.log('Checking if has role!')
    this.authService.userSubject.subscribe(user => {
      this.user = user;
      this.hasRole = this.checkRole(role);
      this.updateView();
    });
  }
  private checkRole(role: string) {
    const roles: Role[] | undefined = this.user?.roles;
    return roles?.some(r => r.authority == role) || false;
  }
  private updateView() {
    this.viewContainer.clear();
    if (this.hasRole) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }

}
