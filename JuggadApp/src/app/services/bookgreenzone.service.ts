import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookgreenzoneService {

  constructor(private http: HttpClient) { }

  public loadZones(){
    return this.http.get("http://localhost:5011/bookingSelectZone").toPromise();
  }
}
