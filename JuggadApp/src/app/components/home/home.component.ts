import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private homeservice: HomeService, public router: Router) { }

  nameOfUser = "";
  points:number;

  ngOnInit(): void {
    //sessionStorage.getItem('userId');
    if(sessionStorage.getItem('name') && sessionStorage.getItem('userId')){
      this.nameOfUser = sessionStorage.getItem('name');
      this.homeservice.findPoints(sessionStorage.getItem('userId')).then((points) => {
        this.points = points['point'].recordset[0].Total;
      }).catch((err: any) => {
        console.log(err);
      });

      const dateToday = new Date();
      const today = ((dateToday.getDate() < 10) ? '0' + dateToday.getDate().toString() : dateToday.getDate().toString())+"-"+dateToday.getMonth()+"-"+dateToday.getFullYear();
      const dateTomorrow = new Date(dateToday);
      dateTomorrow.setDate(dateTomorrow.getDate() + 1);
      const tomorrow = ((dateTomorrow.getDate() < 10) ? '0' + dateTomorrow.getDate().toString() : dateTomorrow.getDate().toString())+"-"+dateTomorrow.getMonth()+"-"+dateTomorrow.getFullYear();

      this.homeservice.findTodayAndTomorrowBooking(today, tomorrow, sessionStorage.getItem('userId')).then((points) => {
        this.points = points['point'].recordset[0].Total;
      }).catch((err: any) => {
        console.log(err);
      });

    }else{
      this.router.navigate(['/login']);
    }

    
  }

}
