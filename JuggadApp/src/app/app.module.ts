import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { NavigatorComponent } from './components/navigator/navigator.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { MessagingComponent } from './components/messaging/messaging.component';
import { BookgreenzoneComponent } from './components/bookgreenzone/bookgreenzone.component';
import { FormsModule } from '@angular/forms';
import { ConfirmbookingComponent } from './components/confirmbooking/confirmbooking.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavigatorComponent,
    NotificationsComponent,
    RegistrationComponent,
    MessagingComponent,
    BookgreenzoneComponent,
    ConfirmbookingComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
