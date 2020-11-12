import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {
    
   }
  
  public login(username :string, password :string) {
    return this.http.post("http://34.205.83.36:5011/login", {
      username : username,
      password : password
    }).toPromise();
  }
}

