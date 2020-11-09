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
    return this.http.post("http://52.91.17.178:5011/api/registration", {
      name : name,
      email : email,
      mobile : mobile,
      password : password
    }).toPromise();
  }
}
