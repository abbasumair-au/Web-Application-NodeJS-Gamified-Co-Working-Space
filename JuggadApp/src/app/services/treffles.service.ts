import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TrefflesService {

  constructor(private http: HttpClient) { }

  public getTrefflesDetails(userId){
    let params = new HttpParams();
    params = params.append('UID',userId);
    return this.http.get("http://52.91.17.178:5011/ViewTrefflesDetails", {params: params}).toPromise();
  }

}
