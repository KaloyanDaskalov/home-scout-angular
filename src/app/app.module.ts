import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
//component modules
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { NotFoundModule } from './not-found/not-found.module';
//firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from "@angular/fire/auth";
import { environment } from '../environments/environment';
//components
import { MainComponent } from './main/main.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { GlobalMessagesComponent } from './shared/global-messages/global-messages.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LoaderComponent,
    GlobalMessagesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    CoreModule,
    AuthModule,
    SharedModule,
    NotFoundModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
