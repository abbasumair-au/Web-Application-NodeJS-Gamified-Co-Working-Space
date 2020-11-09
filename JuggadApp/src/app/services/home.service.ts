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
    return this.http.get("http://52.91.17.178:5011/api/userTrefels", {params: params}).toPromise();
  }

  public findTodayAndTomorrowBooking(today, tomorrow, uId) {
    let params = new HttpParams();
    params = params.append('today',today);
    params = params.append('tomorrow',tomorrow);
    params = params.append('uId',uId);
    return this.http.get("http://52.91.17.178:5011/api/ViewTodayBooking", {params: params}).toPromise();
  }
}
