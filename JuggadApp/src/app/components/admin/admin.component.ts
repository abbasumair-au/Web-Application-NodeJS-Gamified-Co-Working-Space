import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
//import {PythonShell} from 'python-shell';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private adminservice:AdminService) { }

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
  }

  public changeGreenHourPrice(daypart, action){
    this.adminservice.changeGreenHourPrice(daypart, action).then((data) => {
      console.log(data);
      /*PythonShell.run('refreshmodel.py', null, function (err) {
        if (err) throw err;
        console.log('finished');
      });*/
      this.simulateBooking("new");
    }).catch((err: any) => {
      console.log(err);
    });
  }

  public changeGZPrice(zone, action){
    this.adminservice.changeGZPrice(zone, action).then((data) => {
      console.log(data);
      /*PythonShell.run('my_script.py', null, function (err) {
        if (err) throw err;
        console.log('finished');
      });*/
      this.simulateBooking("new");
    }).catch((err: any) => {
      console.log(err);
    });
    
  }

  public changeOccupancyPrice(occ, action){
    this.adminservice.changeOccupancyPrice(occ, action).then((data) => {
      console.log(data);
      /*PythonShell.run('my_script.py', null, function (err) {
        if (err) throw err;
        console.log('finished');
      });*/
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
      /*let t1 = this.morningHours[Math.random() * this.morningHours.length];
      let t2 = this.morningHours[Math.random() * this.morningHours.length];*/
      startTime = 7;
      endTime = 8;
    }else if(this.selectedDayPart === "Afternoon"){
      /*let t1 = this.afternoonHours[Math.random() * this.afternoonHours.length];
      let t2 = this.afternoonHours[Math.random() * this.afternoonHours.length];*/
      startTime = 14;
      endTime = 15;
    }else if(this.selectedDayPart === "Evening"){
      /*let t1 = this.eveningHours[Math.random() * this.eveningHours.length];
      let t2 = this.eveningHours[Math.random() * this.eveningHours.length];*/
      startTime = 19;
      endTime = 20;
    }else if(this.selectedDayPart === "Night"){
      /*let t1 = this.nightHours[Math.random() * this.nightHours.length];
      let t2 = this.nightHours[Math.random() * this.nightHours.length];*/
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

}
