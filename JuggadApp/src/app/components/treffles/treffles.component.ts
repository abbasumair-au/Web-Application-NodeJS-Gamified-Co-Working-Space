import { Component, OnInit } from '@angular/core';

import { TrefflesService } from 'src/app/services/treffles.service';


@Component({
  selector: 'app-treffles',
  templateUrl: './treffles.component.html',
  styleUrls: ['./treffles.component.css']
})
export class TrefflesComponent implements OnInit {

  constructor(private trefflesservice:TrefflesService) { }

  trefflesDetails = [];

  ngOnInit(): void {
    this.trefflesservice.getTrefflesDetails(sessionStorage.getItem('userId')).then((data) => {
      this.trefflesDetails = data['trefflesDetails'].recordsets[0];
      console.log(this.trefflesDetails);
    }).catch((err: any) => {
      console.log(err);
    });
  
  }

}
