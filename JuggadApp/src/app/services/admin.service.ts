import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  public changeGreenHourPrice(dayPart, action){
    let params = new HttpParams();
    params = params.append('dayPart',dayPart);
    params = params.append('action',action);
    return this.http.get("http://52.91.17.178:5011/api/changeGreenHourPrice", {params: params}).toPromise();
  }

  public changeGZPrice(zone, action){
    let params = new HttpParams();
    params = params.append('zone',zone);
    params = params.append('action',action);
    return this.http.get("http://52.91.17.178:5011/api/changeGZPrice", {params: params}).toPromise();
  }

  public changeOccupancyPrice(occ, action){
    let params = new HttpParams();
    params = params.append('occ',occ);
    params = params.append('action',action);
    return this.http.get("http://52.91.17.178:5011/api/changeOccupancyPrice", {params: params}).toPromise();
  }

  public simulateBooking(advdays, gz, rz, startTime, endTime,occupancy){
    let params = new HttpParams();
    params = params.append('a',advdays);
    params = params.append('b',gz);
    params = params.append('c',rz);
    params = params.append('d',startTime);
    params = params.append('e',endTime);
    params = params.append('f',occupancy);
    return this.http.get("http://52.91.17.178:9000/MLBookingSimmulation_api", {params: params}).toPromise();
  }

  public getOldPrice(advdays, gz, rz, startTime, endTime,occupancy){
    let params = new HttpParams();
    params = params.append('a',advdays);
    params = params.append('b',gz);
    params = params.append('c',rz);
    params = params.append('d',startTime);
    params = params.append('e',endTime);
    params = params.append('f',occupancy);
    return this.http.get("http://52.91.17.178:9000/MLBookingPrice_api", {params: params}).toPromise();
  }



  public updateBookingPriceModel(){
    return this.http.get("http://52.91.17.178:5011/api/updateBookingPriceModel").toPromise();
  }

}
