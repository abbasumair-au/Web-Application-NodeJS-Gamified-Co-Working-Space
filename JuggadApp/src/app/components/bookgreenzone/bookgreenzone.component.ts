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

  hours: number[] = [0, 1, 2, 3, 4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
  isFirstGZTime = true;
  isFirstRZTime = true;

  GZIds: number[];
  RZIds: number[];


  selectedMonth = 0;
  selectedYear = 0;
  today = "";
  days;




  pricecolors : PriceColor[] = [
    {
      price_min: 0,
      price_max: 5,
      color: 'red'
    },
    {
      price_min: 6,
      price_max: 10,
      color: 'yellow'
    },{
      price_min: 11,
      price_max: 100,
      color: 'green'
    }
  ];
  
  ngOnInit(): void {
    var currentDate = new Date();
    this.selectedYear = currentDate.getUTCFullYear();
    this.selectedMonth = currentDate.getUTCMonth() +1;
    this.today = currentDate.getDate()+"-"+currentDate.getMonth()+"-"+currentDate.getFullYear();
    this.days = this.getDaysInMonth(this.selectedMonth, this.selectedYear);
    console.log("size in oninit");
    console.log(this.days.length);

    
    this.bookgreenzoneservice.getGZIds().then((data) => {
      this.GZIds = data['GZIds'].recordset;
    }).catch((err: any) => {
      console.log(err);
    });
    this.bookgreenzoneservice.getRZIds().then((data) => {
      this.RZIds = data['RZIds'].recordset;
    }).catch((err: any) => {
      console.log(err);
    });
  }

  async getDaysInMonth(month, year) {
    let days = [];
    console.log("date extraction starts");
    var date = new Date(year, month, 1);
    while (date.getMonth() === month) {
      days.push(date.getDate()+"-"+date.getMonth()+"-"+date.getFullYear());
      date.setDate(date.getDate() + 1);
    }    
    console.log(days.length);
    return days;
  }


  public monthChange(event){
      this.getDaysInMonth(event.month, event.year);
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

  async findColor(curr_date : any){
  /*  let calDayPrice;
    let day = curr_date.day;
    let month = curr_date.month + 1; // add 1 because months are indexed from 0
    let year = curr_date.year;
    let calDate = day+"-"+month+"-"+year;

    const dayexistsinarray = this.days.find(day => day === calDate);
    let data = await this.bookgreenzoneservice.getPriceOfTheDay(calDate);
    if(data){
      calDayPrice =  data['price'];
    }
    if(dayexistsinarray){
      const pricecolor: PriceColor = this.pricecolors.find(prColor => {
        if(calDayPrice >= prColor.price_min && calDayPrice <= prColor.price_max){
          return true;
        }
      }) 
      if(pricecolor){
      }
    }*/
    return "inherit";





/*
    for (let day of this.days) {
      console.log("loop executes");
      if(calDate === day){
        let data = await this.bookgreenzoneservice.getPriceOfTheDay(calDate);
        if(data){
          calDayPrice =  data['price'];
        }
        if(calDayPrice){
          const pricecolor: PriceColor = this.pricecolors.find(prColor => {
            if(calDayPrice >= prColor.price_min && calDayPrice <= prColor.price_max){
              return true;
            }
          }) 
          if(pricecolor){
            return pricecolor.color;
          }
        }else{
          return  "inherit"
        }
      }
    }*/



  /* if(month === this.selectedMonth && year === this.selectedYear){
      let data = await this.bookgreenzoneservice.getPriceOfTheDay(calDate);
      if(data){
        calDayPrice =  data['price'];
      }
      const pricecolor: PriceColor = this.pricecolors.find(prColor => {
        if(calDayPrice >= prColor.price_min && calDayPrice <= prColor.price_max){
          return true;
        }
      }) 
      if(pricecolor){
        return pricecolor.color;
      }
      return "inherit";
    }    */
  }


  async findButtonColor(currenthour){
   /* let calDayPrice;
    let day = this.bookingdate.getDate();
    let month = this.bookingdate.getMonth() + 1; // add 1 because months are indexed from 0
    let year = this.bookingdate.getFullYear();
    let calDate = day+"-"+month+"-"+year;

    const hour = this.hours.find(hour => hour === currenthour);
    let data = await this.bookgreenzoneservice.getPriceOfEachHour(calDate, hour);
    if(data){
      calDayPrice =  data['price'];
    }
    if(hour){
      const pricecolor: PriceColor = this.pricecolors.find(prColor => {
        if(calDayPrice >= prColor.price_min && calDayPrice <= prColor.price_max){
          return true;
        }
      }) 
      if(pricecolor){
      }
    }*/
    return "inherit";
  }




  public fillColor(curr_date : any){
    /*console.log(curr_date);
    const occDetails: PricePerDate = this.priceList.find(occ => occ.date === curr_date.day);
    if(occDetails){
      const occupancycolor: OccupancyColor = this.occupancycolors.find(occColor => {
        if(occDetails.price >= occColor.occupancy_min && occDetails.price <= occColor.occupancy_max){
          return true;
        }
      }) 
      if(occupancycolor){
        return occupancycolor.color;
      }
    }
    return "inherit";*/
  }


  public bookZone(){
    let randomZoneId;
    if(this.selectedZone === 'GZ'){
      randomZoneId = this.GZIds[Math.random() * this.GZIds.length];
    }else{
      randomZoneId = this.RZIds[Math.random() * this.RZIds.length];
    }

    this.userId = parseInt(sessionStorage.getItem('userId'));
    this.bookgreenzoneservice.saveBooking(2, randomZoneId, this.date, this.startTime, this.endTime, this.price).then((data) => {
      this.router.navigate(['/home']);
    }).catch((err: any) => {
      console.log(err);
    });
  }
}

interface PricePerDate {
  date: number,
  price: number
}

interface PriceColor {
  price_min: number,
  price_max: number,
  color: string
}
