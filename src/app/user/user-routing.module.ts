import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { ProfileComponent } from './profile/profile.component';


const routes: Routes = [
  {path:'advertisement', children: [
    {path:'', redirectTo: '/advertisements', pathMatch: 'full'},
    {path:'create', component: CreateComponent}
  ]},
  {path:'profile', component: ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
