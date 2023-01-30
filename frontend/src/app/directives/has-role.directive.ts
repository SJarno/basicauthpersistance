import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Role } from '../models/Role';
import { AuthService } from '../services/auth.service';

@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective {



  constructor(private authService: AuthService,
    private viewContainer: ViewContainerRef,
    private templateRef: TemplateRef<any>) { }

  @Input()
  set appHasRole(role: string) {
    console.log('Role being passed ', role);
    if (this.authService.user) {
      const roles: Role[] | undefined = this.authService.user?.roles;
      if (roles?.some(r => r.authority === role)) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainer.clear();
      }


    }
  }

}
