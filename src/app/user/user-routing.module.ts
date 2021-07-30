import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { CreateComponent } from './create/create.component';
import { ProfileComponent } from './profile/profile.component';


const routes: Routes = [
  {path:'advertisement', children: [
    {path:'', redirectTo: '/advertisements', pathMatch: 'full'},
    {path:'create', canActivate:[AuthGuard], component: CreateComponent}
  ]},
  {path:'profile', canActivate:[AuthGuard], component: ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
