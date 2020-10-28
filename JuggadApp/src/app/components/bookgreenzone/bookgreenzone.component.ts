import { Component, OnInit } from '@angular/core';
import { BookgreenzoneService } from 'src/app/services/bookgreenzone.service';

@Component({
  selector: 'app-bookgreenzone',
  templateUrl: './bookgreenzone.component.html',
  styleUrls: ['./bookgreenzone.component.css']
})
export class BookgreenzoneComponent implements OnInit {

  constructor(private bookgreenzoneservice:BookgreenzoneService) { }

  viewDate: Date = new Date();
  events = [];
  zones :any = [];

  ngOnInit(): void {
    console.log("inside method");
    this.bookgreenzoneservice.loadZones().then((receivedzones) => {
      var resultArray = Object.keys(receivedzones).map((index)=>{
        console.log(receivedzones[index]);
        this.zones = receivedzones[index];
        // do something with person
        return this.zones;
    });


    }).catch((err: any) => {
      console.log(err);
    });
  }

}
