import { Component, OnInit } from '@angular/core';
import { RegisterService } from 'src/app/services/register.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private registerservice:RegisterService, public router: Router) {

   }

  name = "";
  email = "";
  mobile = "";
  password ="";
  confirmPassword = "";
  errorMessage = "";

  ngOnInit(): void {
  }

  public register(){
    console.log("data: "+this.name+":"+this.email+":"+this.mobile+":"+this.password);
    console.log(this.password != this.confirmPassword);
    if(this.password != this.confirmPassword){
      this.errorMessage = "password mismatch";
    }else{
      this.errorMessage = "";
      this.registerservice.registerUser(this.name, this.email, this.mobile, this.password).then((data) => {
        console.log("received data :- "+data);
        this.router.navigate(['/login']);
      }).catch((err: any) => {
        console.log(err);
      });
    }
  }

}
