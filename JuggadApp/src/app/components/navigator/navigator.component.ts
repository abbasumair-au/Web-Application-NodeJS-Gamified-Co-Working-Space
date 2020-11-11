import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.css']
})
export class NavigatorComponent implements OnInit {

  constructor(public router: Router) { }

  isAdmin:Boolean;

  navList: any[];

  adminNav: any[] = [
    {
      path: 'admin',
      label: 'Home'
    },
    {
    path: 'notifications',
    label: 'Messages'
    },
    {
    path: 'graph',
    label: 'Electricity'
    }
  ];

  userNav: any[] = [
    {
    path: 'home',
    label: 'Home'
    },
    {
    path: 'notifications',
    label: 'Messages'
    },
    {
    path: 'messaging',
    label: 'Contacts'
    },
    {
    path: 'bookgreenzone',
    label: 'Booking'
    },
    {
    path: 'treffles',
    label: 'Points'
    }
  ];

  ngOnInit(): void {
  /*  if(sessionStorage.getItem('userId') === 'admin'){
      this.navList = this.adminNav;
    }else{
      this.navList = this.userNav;
    } */
    this.navList = [{
      path: 'home',
      label: 'Home'
      },
      {
      path: 'admin',
      label: 'Admin'
      },
      {
      path: 'bookgreenzone',
      label: 'Booking'
      },
      {
      path: 'treffles',
      label: 'Points'
      },
      {
      path: 'messaging',
      label: 'Contacts'
      },
      {
      path: 'notifications',
      label: 'Messages'
      },
      {
      path: 'graph',
      label: 'Electricity'
      }];
  }

  public logoutUser(){
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('name');
  }

}
