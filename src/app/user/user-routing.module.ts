import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';

import { CreateComponent } from './create/create.component';
import { MyAdvertisementsComponent } from './my-advertisements/my-advertisements.component';
import { EditComponent } from './edit/edit.component';
import { ProfileComponent } from './profile/profile.component';
import { MyFavoritesComponent } from './my-favorites/my-favorites.component';


const routes: Routes = [
  {path:'', children: [
    {path:'', redirectTo: '/advertisements', pathMatch: 'full'},
    {path:'create', canActivate:[AuthGuard], component: CreateComponent},
    {path:'edit/:id', canActivate:[AuthGuard], component: EditComponent},
    {path:'my-advertisements', canActivate:[AuthGuard], component: MyAdvertisementsComponent},
    {path:'my-favorites', canActivate:[AuthGuard], component: MyFavoritesComponent},
    {path:'my-profile', canActivate:[AuthGuard], component: ProfileComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
