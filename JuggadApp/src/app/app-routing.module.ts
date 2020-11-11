import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { MessagingComponent } from './components/messaging/messaging.component';
import { LoginComponent } from './components/login/login.component';
import { BookgreenzoneComponent } from './components/bookgreenzone/bookgreenzone.component';
import { ConfirmbookingComponent } from './components/confirmbooking/confirmbooking.component';
import { HomeComponent } from './components/home/home.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { AdminComponent } from './components/admin/admin.component';
import { TrefflesComponent } from './components/treffles/treffles.component';
import { GraphComponent } from './components/graph/graph.component';


const routes: Routes = [
  { path: '', 
  redirectTo: '/login', 
  pathMatch: 'full' },
  {
  path: 'notifications',
  component: NotificationsComponent
  },
  {
  path: 'messaging',
  component: MessagingComponent
  },
  {
  path: 'login',
  component: LoginComponent
  },
  {
  path: 'bookgreenzone',
  component: BookgreenzoneComponent
  },
  {
  path: 'confirmbooking',
  component: ConfirmbookingComponent
  },
  {
  path: 'home',
  component: HomeComponent
  },
  {
  path: 'register',
  component: RegistrationComponent
  },
  {
  path: 'admin',
  component: AdminComponent
  },
  {
  path: 'treffles',
  component: TrefflesComponent
  },
  {
  path: 'graph',
  component: GraphComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
