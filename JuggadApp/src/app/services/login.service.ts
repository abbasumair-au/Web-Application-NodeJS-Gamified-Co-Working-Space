import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {
    
   }
  
  public login(username :string, password :string) {
    return this.http.post("http://ec2-54-226-17-170.compute-1.amazonaws.com:5011/login", {
      username : username,
      password : password
    }).toPromise();
  }
}

