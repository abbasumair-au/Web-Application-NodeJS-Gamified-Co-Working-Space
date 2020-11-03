import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookgreenzoneService {

  constructor(private http: HttpClient) { }

  public getPricePerHourOfSelectedZone(date, selectedZone, startTime, endTime){
    //let params = new HttpParams();
    //params = params.append('date',date);
    //params = params.append('selectedZone',selectedZone);
    //params = params.append('startTime', startTime);
    //params = params.append('endTime', endTime);
    return this.http.get("http://localhost:5011/getPricePerHourOfSelectedZone"/*, {params: params}*/).toPromise();
  }

  public getPriceOfTheDay(date){
    let params = new HttpParams();
    params = params.append('date',date);
    return this.http.get("http://localhost:5011/getPriceOfTheDay", {params: params}).toPromise();
  }

  public getPriceOfEachHour(date, startTime){
    let params = new HttpParams();
    params = params.append('date',date);
    return this.http.get("http://localhost:5011/getPriceOfTheDay", {params: params}).toPromise();
  }

  public checkOccupancy(zoneId){
    let params = new HttpParams();
   params = params.append('zoneId',zoneId);
    return this.http.post("http://localhost:5011/saveBooking", {params: params}).toPromise();
  }

  public saveBooking(userId, zoneId, bookingDate, startTime, endTime, cost){
    return this.http.post("http://localhost:5011/saveBooking", {
      UID : userId,
      zoneId : zoneId,
      date : bookingDate,
      starttime : startTime,
      endtime : endTime,
      cost : cost,
    }).toPromise();
  }

  public getGZIds(){
    return this.http.get("http://localhost:5011/getGZIds").toPromise();
  }
  public getRZIds(){
    return this.http.get("http://localhost:5011/getRZIds").toPromise();
  }
}
