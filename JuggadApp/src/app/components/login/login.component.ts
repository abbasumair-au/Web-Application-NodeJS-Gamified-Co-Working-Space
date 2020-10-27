import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginservice:LoginService, public router: Router) { }
  username = "";
  password = "";
  //page load
  ngOnInit(): void {
  
  }

  public login(){
    this.loginservice.login(this.username, this.password).then((data) => {
      console.log("received data :- "+data);
      this.router.navigate(['/home']);
    }).catch((err: any) => {
      console.log(err);
    });
  }

}
