import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  public findPoints(userId) {
    let params = new HttpParams();
    params = params.append('UID',userId);
    return this.http.get("http://34.205.83.36:5011/userTrefels", {params: params}).toPromise();
  }

  public findTodayAndTomorrowBooking(today, tomorrow, uId) {
    let params = new HttpParams();
    params = params.append('today',today);
    params = params.append('tomorrow',tomorrow);
    params = params.append('uId',uId);
    return this.http.get("http://34.205.83.36:5011/ViewTodayBooking", {params: params}).toPromise();
  }

  /*public moveTodayBooking(date, ZID, startTime, endTime, BID, UID) {
    let params = new HttpParams();
    params = params.append('date',date);
    params = params.append('ZID',ZID);
    params = params.append('startTime',startTime);
    params = params.append('endTime',endTime);
    params = params.append('BID',BID);
    params = params.append('UID',UID);
    return this.http.get("http://localhost:5011/moveTodayBooking", {params: params}).toPromise();
  }*/
}
