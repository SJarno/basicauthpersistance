import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { SuperuserComponent } from './components/superuser/superuser.component';
import { UserComponent } from './components/user/user.component';
import { RoleGuard } from './guards/role.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'user-page',
    component: UserComponent,
    canActivate: [RoleGuard],
    data: { role: 'ROLE_USER' }
  },
  {
    path: 'super-page',
    component: SuperuserComponent,
    canActivate: [RoleGuard],
    data: { role: 'ROLE_SUPERUSER' }
  },
  { path: 'admin-page', component: AdminComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
