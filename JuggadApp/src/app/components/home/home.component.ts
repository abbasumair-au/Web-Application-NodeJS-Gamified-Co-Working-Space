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

  todayStartTime = "";
  todayEndTime = "";
  todayRoom = "";
  todayBookingId = 0;

  todayBooking = "";

  tomorrowStartTime = "";
  tomorrowEndTime = "";
  tomorrowRoom = "";
  tomorrowBookingId = 0;

  tomorrowBooking = "";



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

      this.homeservice.findTodayAndTomorrowBooking(today, tomorrow, sessionStorage.getItem('userId')).then((booking) => {
        let bookings = booking['currentBooking'].recordsets[0];
        if(bookings[0]){
          this.todayStartTime = bookings[0].StartTime;
          this.todayEndTime = bookings[0].EndTime;
          this.todayRoom = bookings[0].RoomNo;
          this.todayBookingId = bookings[0].BID;
          this.todayBooking = this.todayStartTime+" to "+this.todayEndTime+" - "+this.todayRoom;
        }else{
          this.todayBooking = "No zones booked for today. Go to booking tab for new booking";
        }

        if(bookings[1]){
          this.tomorrowStartTime = bookings[1].StartTime;
          this.tomorrowEndTime = bookings[1].EndTime;
          this.tomorrowRoom = bookings[1].RoomNo;
          this.tomorrowBookingId = bookings[1].BID;
          this.tomorrowBooking = this.tomorrowStartTime+" to "+this.tomorrowEndTime+" - "+this.tomorrowRoom;
        }else{
          this.tomorrowBooking = "No zones booked for tomorrow. Go to booking tab for new booking";
        }

      }).catch((err: any) => {
        console.log(err);
      });

    }else{
      this.router.navigate(['/login']);
    }

    
  }

}
