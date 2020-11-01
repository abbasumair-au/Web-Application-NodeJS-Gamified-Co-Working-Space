import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookgreenzoneService {

  constructor(private http: HttpClient) { }

  public getPricePerHourOfSelectedZone(date, selectedZone, startTime, endTime){
    let params = new HttpParams();
    params = params.append('date',date);
    params = params.append('selectedZone',selectedZone);
    params = params.append('startTime', startTime);
    params = params.append('endTime', endTime);
    return this.http.get("//localhost:5011/getPricePerHourOfSelectedZone", {params: params}).toPromise();
  }

  public saveBooking(userId, zoneName, bookingDate, startTime, endTime, cost){
    return this.http.post("http://localhost:5011/saveBooking", {
      UID : userId,
      zoneName : zoneName,
      date : bookingDate,
      starttime : startTime,
      endtime : endTime,
      cost : cost,
    }).toPromise();
  }

}
