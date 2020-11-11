import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
//import {PythonShell} from 'python-shell';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private adminservice:AdminService, public router: Router) { }

  selectedDayPart = "";
  selectedZone = "";
  selectedOccupancy = "";
  morningHours: number[] = [6,7,8];
  afternoonHours: number[] = [9,10,11,12,13,14,15,16,17,18];
  eveningHours: number[] = [19,20,21,22];
  nightHours: number[] = [22,23,24,0,1,2,3,4,5];
  occupancyStatus = ["Low","Medium","High"];
  newPrice = 0;
  oldPrice = 0;

  ngOnInit(): void {
    if(sessionStorage.getItem('userId') !== 'admin'){    
      this.router.navigate(['/home']);
    }
    
  }

  public changeGreenHourPrice(daypart, action){
    this.adminservice.changeGreenHourPrice(daypart, action).then((data) => {
      console.log(data);
      this.simulateBooking("new");
    }).catch((err: any) => {
      console.log(err);
    });
  }

  public changeGZPrice(zone, action){
    this.adminservice.changeGZPrice(zone, action).then((data) => {
      console.log(data);
      this.simulateBooking("new");
    }).catch((err: any) => {
      console.log(err);
    });
    
  }

  public changeOccupancyPrice(occ, action){
    this.adminservice.changeOccupancyPrice(occ, action).then((data) => {
      console.log(data);
      this.simulateBooking("new");
    }).catch((err: any) => {
      console.log(err);
    });
    
  }

  public simulateBooking(which){
    let startTime: number;
    let endTime:number;
    let t1: number;
    let t2: number;
    let advdays = 30;
    let gz = 0;
    let rz = 0;
    let occupancy = 0;
    if(this.selectedDayPart === "Morning"){
      startTime = 7;
      endTime = 8;
    }else if(this.selectedDayPart === "Afternoon"){
      startTime = 14;
      endTime = 15;
    }else if(this.selectedDayPart === "Evening"){
      startTime = 19;
      endTime = 20;
    }else if(this.selectedDayPart === "Night"){
      startTime = 22;
      endTime = 23;
    }

    if(this.selectedZone === "GZ"){
      gz = 1;
      rz = 0;
    }else if(this.selectedZone === "RZ"){
      rz = 1;
      gz = 0;
    }
    
    if(this.selectedOccupancy === "Low"){
      occupancy = 25;
    }else if(this.selectedOccupancy === "Medium"){
      occupancy = 50;
    }else if(this.selectedOccupancy === "High"){
      occupancy = 80;
    }
    this.adminservice.simulateBooking(advdays, gz, rz, startTime, endTime, occupancy).then((data) => {
      console.log(data['price']);
      this.newPrice = Math.round(data['price']);
    }).catch((err: any) => {
      console.log(err);
    });

    if(which === "old"){
      this.adminservice.getOldPrice(advdays, gz, rz, startTime, endTime, occupancy).then((data) => {
        console.log(data['price']);
        this.oldPrice = Math.round(data['price']);
      }).catch((err: any) => {
        console.log(err);
      });
    }
  }

  
  public updateBookingPriceModel(){
    this.adminservice.updateBookingPriceModel().then((data) => {
      console.log(data);
    }).catch((err: any) => {
      console.log(err);
    });
  }

}
