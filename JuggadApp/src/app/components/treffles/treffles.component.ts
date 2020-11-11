import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TrefflesService } from 'src/app/services/treffles.service';


@Component({
  selector: 'app-treffles',
  templateUrl: './treffles.component.html',
  styleUrls: ['./treffles.component.css']
})
export class TrefflesComponent implements OnInit {

  constructor(private trefflesservice:TrefflesService, public router: Router) { }

  trefflesDetails = [];

  ngOnInit(): void {
    if(sessionStorage.getItem('userId') !== 'admin'){    
      this.trefflesservice.getTrefflesDetails(sessionStorage.getItem('userId')).then((data) => {
        this.trefflesDetails = data['trefflesDetails'].recordsets[0];
        console.log(this.trefflesDetails);
      }).catch((err: any) => {
        console.log(err);
      });
    }else{
      this.router.navigate(['/admin']);
    }
    
  }

}
