import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GraphService {

  constructor(private http: HttpClient) { }

  public savingsGreenPath() {
    return this.http.get("http://ec2-54-226-17-170.compute-1.amazonaws.com:5011/savingsGreenPath").toPromise();
  }

  public savingsfromBookingGreenHour() {
    return this.http.get("http://ec2-54-226-17-170.compute-1.amazonaws.com:5011/savingsfromBookingGreenHour").toPromise();
  }

  public savingsfromGreenParking() {
    return this.http.get("http://ec2-54-226-17-170.compute-1.amazonaws.com:5011/savingsfromGreenParking").toPromise();
  }
}
