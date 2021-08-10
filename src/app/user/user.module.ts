import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// modules
import { SharedModule } from '../shared/shared.module';
// components
import { CreateComponent } from './create/create.component';
import { ProfileComponent } from './profile/profile.component';
import { MyAdvertisementsComponent } from './my-advertisements/my-advertisements.component';
import { MyCardComponent } from './my-card/my-card.component';
import { EditComponent } from './edit/edit.component';
import { MyFavoritesComponent } from './my-favorites/my-favorites.component';

@NgModule({
  declarations: [
    CreateComponent,
    ProfileComponent,
    MyAdvertisementsComponent,
    MyCardComponent,
    EditComponent,
    MyFavoritesComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule,
    SharedModule
  ]
})
export class UserModule { }
