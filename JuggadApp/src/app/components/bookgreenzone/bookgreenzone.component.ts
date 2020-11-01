import { Component, OnInit } from '@angular/core';
import { BookgreenzoneService } from 'src/app/services/bookgreenzone.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bookgreenzone',
  templateUrl: './bookgreenzone.component.html',
  styleUrls: ['./bookgreenzone.component.css']
})

export class BookgreenzoneComponent implements OnInit {

  constructor(private bookgreenzoneservice:BookgreenzoneService, private router: Router) { }

  viewDate: Date = new Date();
  events = [];
  zones :any = [];

  selectedZone = "";
  time ="";
  date ="";
  startTime: number;
  endTime: number;

  txt_totalPrice= 0;
  txt_hours= 0;
  showStartTime="";
  showEndTime ="";


  price= 0;
  bookingdate: Date;

  userId: number;
  userName= "";

  numberOfButtons: number[] = [0, 1, 2, 3, 4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
  isFirstGZTime = true;
  isFirstRZTime = true;




  occupancycolors : OccupancyColor[] = [
    {
      occupancy_min: 0,
      occupancy_max: 30,
      color: 'red'
    },
    {
      occupancy_min: 31,
      occupancy_max: 60,
      color: '#fcad03'
    },{
      occupancy_min: 61,
      occupancy_max: 100,
      color: 'green'
    }
  ];
  occupancyList: Occupancy[] = [
    {
      date: 15,
      occupancy: 83
    },
    {
      date: 2,
      occupancy: 26
    },
    {
      date: 28,
      occupancy: 48
    },
    {
      date: 12,
      occupancy: 68
    },
    {
      date: 10,
      occupancy: 68
    }
  ];





  

  ngOnInit(): void {
  
  }

  public selectZoneTime(zoneName, time){
    this.selectedZone = zoneName
    let day = this.bookingdate.getDate();
    let month = this.bookingdate.getMonth() + 1; // add 1 because months are indexed from 0
    let year = this.bookingdate.getFullYear();
    this.date = day+"-"+month+"-"+year;
    if(zoneName === 'GZ'){
      if(this.isFirstGZTime){
        this.startTime = time;
        this.showStartTime = this.startTime+":00";
        this.isFirstGZTime = false;
        this.showEndTime="";
      }else{
        this.endTime = time;
        this.showEndTime = this.endTime+":00";
        this.txt_hours = this.endTime - this.startTime;
        
      }
    }else{
      if(this.isFirstRZTime){
        this.startTime = time;
        this.showStartTime = this.startTime+":00";
        this.isFirstRZTime = false;
        this.showEndTime="";
      }else{
        this.endTime = time;
        this.showEndTime = this.endTime+":00";
        this.txt_hours = this.endTime - this.startTime;
      }
    } 
    this.txt_totalPrice = 0;
    if(this.endTime != 0){
      this.bookgreenzoneservice.getPricePerHourOfSelectedZone(this.date, zoneName, this.startTime, this.endTime).then((data) => {
        this.price =  data['price'];
        if(this.price == 0){
          this.price =7
        }
        this.txt_totalPrice = (this.endTime - this.startTime)*this.price;
      }).catch((err: any) => {
        console.log(err);
      });
    }else{
      this.txt_totalPrice = 0;
    }
  }

  public fillColor(curr_date : any){
    console.log(curr_date);
    const occDetails: Occupancy = this.occupancyList.find(occ => occ.date === curr_date.day);
    if(occDetails){
      const occupancycolor: OccupancyColor = this.occupancycolors.find(occColor => {
        if(occDetails.occupancy >= occColor.occupancy_min && occDetails.occupancy <= occColor.occupancy_max){
          return true;
        }
      }) 
      if(occupancycolor){
        return occupancycolor.color;
      }
    }
    return "inherit";
  }


  public bookZone(){
    console.log("inside bookZone method");
    this.bookingdate;
    this.userId = parseInt(sessionStorage.getItem('userId'));
    this.txt_totalPrice;
    this.selectedZone;    

    console.log(this.date+":"+this.startTime+":"+this.endTime+":"+this.price+":"+this.selectedZone);
    this.bookgreenzoneservice.saveBooking(2, this.selectedZone, this.date, this.startTime, this.endTime, this.price).then((data) => {
      console.log(data);
      this.router.navigate(['/home']);
    }).catch((err: any) => {
      console.log(err);
    });

    
  }
}

interface Occupancy {
  date: number,
  occupancy: number
}

interface OccupancyColor {
  occupancy_min: number,
  occupancy_max: number,
  color: string
}
