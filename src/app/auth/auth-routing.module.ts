import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireAuthGuard, redirectLoggedInTo } from '@angular/fire/auth-guard';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const redirectLoggedInToItems = () => redirectLoggedInTo(['advertisements']);

const routes: Routes = [
  {path:'auth', children: [
    {path:'', redirectTo: '/advertisements', pathMatch: 'full'},
    {path:'register', component: RegisterComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectLoggedInToItems }},
    {path:'login', component: LoginComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectLoggedInToItems }}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
