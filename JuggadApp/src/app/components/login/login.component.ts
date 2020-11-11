import { analyzeNgModules } from '@angular/compiler';
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
  user: any;
  //page load
  ngOnInit(): void {
  
  }

  public login(){
    this.loginservice.login(this.username, this.password).then((data) => {
      if(this.username === "admin" &&  this.password === "admin"){
        sessionStorage.setItem('userId', 'admin');
        sessionStorage.setItem('name', 'admin');
        this.router.navigate(['/admin']);
      }else{
        sessionStorage.setItem('userId', data['user'].recordset[0].userId);
        sessionStorage.setItem('name', data['user'].recordset[0].name);
        this.router.navigate(['/home']);
      }
    }).catch((err: any) => {
      console.log(err);
    });
  }

  /*public navigateRegisterPage(){
    this.router.navigate(['/register']);
  }*/

}
