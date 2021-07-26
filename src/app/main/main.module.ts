import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { MainComponent } from './main.component';
import { CardComponent } from './card/card.component';


@NgModule({
  declarations: [
    MainComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [MainComponent]
})
export class MainModule { }
