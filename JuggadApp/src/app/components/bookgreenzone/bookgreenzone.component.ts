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
  days = 0;




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

  priceList: PricePerDate[] = [{
    date: "01-11-2020",
    price: 8
  }];
  
  ngOnInit(): void {
    var currentDate = new Date();
    this.selectedYear = currentDate.getUTCFullYear();
    this.selectedMonth = currentDate.getUTCMonth() +1;
    this.today = currentDate.getDate()+"-"+currentDate.getMonth()+"-"+currentDate.getFullYear();
    this.days = this.daysInThisMonth(this.selectedMonth, this.selectedYear);
    this.findMonthPrices();
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

  public daysInThisMonth(month ?:number, year ?:number) {
    return new Date(year, month, 0).getDate();
  }

  public monthChange(event){
    this.days = this.daysInThisMonth(event.month, event.year);
    this.selectedYear = event.year;
    this.selectedMonth = event.month;
    this.findMonthPrices();
  }

  async findMonthPrices(){
    let persons =0;
    console.log("occupancy");
    try{
      for (let i = 1; i <= this.days; i++) {
        let day = ((i < 10) ? '0' + i.toString() : i.toString()) +"-"+ this.selectedMonth +"-"+ this.selectedYear;
        let noOfPersonsPerDay = await this.bookgreenzoneservice.getNoOfPersonsPerDay(day);
        persons = noOfPersonsPerDay['persons'].recordsets[0][0].noOfPersons;
        if(persons){
          let occupancy = (persons/3600)*100;
          let data = await this.bookgreenzoneservice.fillCalender(30, 1, 0, 7, 20, occupancy);
          this.priceList.push({
            date: day,
            price: data['price']
          });
        }
      }
    }catch(e:any){
      console.log(e);
    }
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

  async fillCalender(curr_date : any){
    let day:number = curr_date.day;
    let currentDay = ((day < 10) ? '0' + day.toString() : day.toString()) + "-" + curr_date.month + "-" + curr_date.year;
    let list = this.priceList;
    if(this.priceList){
      const datePrice: PricePerDate = this.priceList.find(priceperday => {
        priceperday.date === currentDay});
      if(datePrice){
        const occupancycolor: PriceColor = this.pricecolors.find(priceColor => {
          if(datePrice.price >= priceColor.price_min && datePrice.price <= priceColor.price_max){
            return true;
          }
        })
        if(occupancycolor){
          return occupancycolor.color;
        }
      }
    }else{
      return "inherit";
    }
    return "yellow";
  }




  public fillHour(curr_date : any){
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
  date: string,
  price: number
}

interface PriceColor {
  price_min: number,
  price_max: number,
  color: string
}

interface HourPrice {
  hour: number,
  price: number
}
