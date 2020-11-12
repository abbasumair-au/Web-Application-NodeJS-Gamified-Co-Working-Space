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
  isPriceReceived = false;
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

  //hours: HourPrice[] = [];
  isFirstGZTime = true;
  isFirstRZTime = true;

  GZIds: number[];
  RZIds: number[];


  selectedMonth = 0;
  selectedYear = 0;
  today = "";
  days = 0;
  selectedDate = "";



  pricecolors : PriceColor[] = [
    {
      price_min: 0,
      price_max: 30,
      color: 'green'
    },
    {
      price_min: 31,
      price_max: 70,
      color: 'yellow'
    },{
      price_min: 71,
      price_max: 1000,
      color: 'red'
    }
  ];

  hourPricecolors : PriceColor[] = [
    {
      price_min: 0,
      price_max: 15,
      color: 'green'
    },
    {
      price_min: 16,
      price_max: 30,
      color: 'yellow'
    },{
      price_min: 31,
      price_max: 1000,
      color: 'red'
    }
  ];

  priceList: PricePerDate[] = [];
  hourOccList: HourPrice[] = [];
  
  ngOnInit(): void {

    for(let i=0; i<24;i++){
      this.hourOccList.push(null);
    }

    var currentDate = new Date();
    this.selectedYear = currentDate.getUTCFullYear();
    this.selectedMonth = currentDate.getUTCMonth() +1;
    this.selectedDate = ((currentDate.getDate() < 10) ? '0' + currentDate.getDate().toString() : currentDate.getDate().toString())+"-"+this.selectedMonth+"-"+this.selectedYear;
    this.days = this.daysInThisMonth(this.selectedMonth, this.selectedYear);
    this.findMonthPrices();

    this.bookgreenzoneservice.getNoOfPersonsPerDayAndStartTime(this.selectedDate).then((data) => {
      const result= data['occupancyByTime'].recordsets[0];
      this.hourOccList = this.hourOccList.map((occ,i) => {
        if(result.includes(r => r.startTime === i)){
           return result.find(r => r.startTime === i)
        }
        return null;
      });
    }).catch((err: any) => {
      console.log(err);
    });

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

  public daySelected(event){
    this.hourOccList = [];
    for(let i=0; i<24;i++){
      this.hourOccList.push(null);
    }
    console.log("event");
    let month = event.getUTCMonth() +1;
    this.selectedDate = ((event.getDate() < 10) ? '0' + event.getDate().toString() : event.getDate().toString()) +"-"+ month +"-"+ event.getUTCFullYear();
    console.log(this.selectedDate );
    this.bookgreenzoneservice.getNoOfPersonsPerDayAndStartTime(this.selectedDate).then(async(data) => {
      console.log(data['occupancyByTime'].recordsets[0]);
      const result= data['occupancyByTime'].recordsets[0];
      for(let i =0 ;i<this.hourOccList.length;i++){
        if(result.find(r => r.startTime === i)){
          const selectedOcc = result.find(r => r.startTime === i);
          const occPcy= await this.getPriceByOccupancy(selectedOcc.startTime, selectedOcc.occupancyByTime);
          this.hourOccList[i] = {
            startTime:selectedOcc.startTime,
            occupancyByTime:selectedOcc.occupancyByTime,
            price: occPcy['price']
          }
        }
      }
      this.hourOccList = [...this.hourOccList];
    }).catch((err: any) => {
      console.log(err);
    });
  }

  public async getPriceByOccupancy(startTime, occupancy){
    try{
      return await this.bookgreenzoneservice.getPricePerHourOfSelectedZone(30, 1, 0, startTime, 19, occupancy);
    }catch(e){
      return null;
    }
    
  }



  async findMonthPrices(){
    this.priceList = [];
    let persons =0;
    try{
      for (let i = 1; i <= this.days; i++) {
        let day = ((i < 10) ? '0' + i.toString() : i.toString()) +"-"+ this.selectedMonth +"-"+ this.selectedYear;
        let noOfPersonsPerDay = await this.bookgreenzoneservice.getNoOfPersonsPerDay(day);
        persons = noOfPersonsPerDay['persons'].recordsets[0][0].noOfPersons;
        if(persons){
          let occupancy = Math.round((persons/1000)*100);
          let data = await this.bookgreenzoneservice.fillCalender(30, 1, 0, 7, 20, occupancy);
          this.priceList.push({
            date: day,
            price: data['price']
          });
        }
      }
      this.isPriceReceived = true;
    }catch(e:any){
      console.log(e);
    }
  }
  

  async selectZoneTime(zoneName, time){
    let persons =0;
    let occupancy=0;
    this.txt_totalPrice = 0;
    this.selectedZone = zoneName
    let day = this.bookingdate.getDate();
    let month = this.bookingdate.getMonth() + 1; // add 1 because months are indexed from 0
    let year = this.bookingdate.getFullYear();
    this.date = day+"-"+month+"-"+year;
    let gz;
    let rz;
    if(zoneName === 'GZ'){
      if(this.isFirstGZTime){
        this.startTime = time;
        this.showStartTime = this.startTime+":00";
        this.isFirstGZTime = false;
        this.showEndTime="";
        gz = 1;
        rz = 0;
      }else{
        this.endTime = time;
        this.showEndTime = this.endTime+":00";
        this.txt_hours = this.endTime - this.startTime;
        rz = 1;
        gz = 0;
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

    let noOfPersonsPerDay = await this.bookgreenzoneservice.getNoOfPersonsPerDay(day);
    console.log("noOfPersonsPerDay")
    console.log(noOfPersonsPerDay);
    persons = noOfPersonsPerDay['persons'].recordsets[0][0].noOfPersons;
    if(persons){
      occupancy = Math.round((persons/3600)*100);
    }else{
      occupancy = 20;
    }
    if(this.endTime != 0 && this.endTime != undefined){
      console.log("occupancy");
      console.log(occupancy);
      this.bookgreenzoneservice.getPricePerHourOfSelectedZone(30, gz, rz, this.startTime, this.endTime, occupancy).then((data) => {
        this.price =  Math.round(data['price']);
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

  public fillCalender(curr_date : any){
    if(this.selectedMonth ===(curr_date.month+1) && this.selectedYear === curr_date.year){
      let day:number = curr_date.day;
      let currentDay = ((day < 10) ? '0' + day.toString() : day.toString()) + "-" + (curr_date.month+1) + "-" + curr_date.year;
      if(this.priceList){
        const datePrice: PricePerDate = this.priceList.find(priceperday=>priceperday.date === currentDay);
        if(datePrice){
          const occupancycolor: PriceColor = this.pricecolors.find(priceColor => {
            if(datePrice.price >= priceColor.price_min && datePrice.price <= priceColor.price_max){
              return true;
            }
          })
          if(occupancycolor){
            return occupancycolor.color;
          }
        }else{
          return "inherit";
        }
      }else{
        return "inherit";
      }
    }else{
      return "inherit";
    }
  }


  public fillTimeColor(price : any){
    const priceColor: PriceColor = this.hourPricecolors.find(pcolor => {
      if(price >= pcolor.price_min && price <= pcolor.price_max){
        return true;
      }
    }) 
    if(priceColor){
      return priceColor.color;
    }
    return "green";
  }


  public bookZone(){
    let randomZoneId: number;
    if(this.selectedZone === 'GZ'){
      randomZoneId = this.GZIds[Math.floor(Math.random() * this.GZIds.length)];
    }else{
      randomZoneId = this.RZIds[Math.random() * this.RZIds.length];
    } 


    this.userId = parseInt(sessionStorage.getItem('userId'));
    this.bookgreenzoneservice.saveBooking(this.userId, randomZoneId['zoneId'], this.date, this.startTime, this.endTime, this.price).then((data) => {
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
  startTime: number,
  occupancyByTime: number,
  price: number;
}
