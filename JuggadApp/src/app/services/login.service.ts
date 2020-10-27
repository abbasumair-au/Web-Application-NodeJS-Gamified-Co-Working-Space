import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {
    
   }
  
  public getData() {
    return this.http.get("https://jsonplaceholder.typicode.com/posts/42").toPromise();
  }

  public login(username :string, password :string) {
    console.log(username+"-"+password);
    return this.http.post("http://localhost:5011/login", {
      username : username,
      password : password
    }).toPromise();
  }
}

