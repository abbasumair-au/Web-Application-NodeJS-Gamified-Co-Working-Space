import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  public registerUser(name :string, email :string, mobile :string, password :string) {
    //console.log(username+"-"+password);
    console.log("data in service: "+name+":"+email+":"+mobile+":"+password);
    return this.http.post("http://34.205.83.36:5011/registration", {
      name : name,
      email : email,
      mobile : mobile,
      password : password
    }).toPromise();
  }
}
