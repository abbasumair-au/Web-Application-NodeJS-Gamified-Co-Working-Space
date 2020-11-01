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
    return this.http.get("http://localhost:5011/userTrefels", {params: params}).toPromise();
  }
}
