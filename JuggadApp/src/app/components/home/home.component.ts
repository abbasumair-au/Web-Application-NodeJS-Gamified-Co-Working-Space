import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private homeservice: HomeService) { }

  nameOfUser = "";
  points:number;

  ngOnInit(): void {
    //sessionStorage.getItem('userId');
    this.nameOfUser = sessionStorage.getItem('name');
    this.homeservice.findPoints(sessionStorage.getItem('userId')).then((points) => {
      this.points = points['point'].recordset[0].Total;
    }).catch((err: any) => {
      console.log(err);
    });


  }

}
