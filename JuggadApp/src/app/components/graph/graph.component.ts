import { Component, OnInit } from '@angular/core';
import { GraphService } from 'src/app/services/graph.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {

  constructor(private graphservice: GraphService) {
    //Object.assign(this, { single })
  }

  greenHour: any[];
  greenPath: any[];
  greenParking: any[];
  multi: any[];

  view: any[] = [500, 300];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Date';
  showYAxisLabel = true;
  yAxisLabel = 'Electricity Saving';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  ngOnInit(): void {
    
    this.graphservice.savingsfromBookingGreenHour().then((data) => {
      console.log(this.greenHour);
      this.greenHour = data['SavingsfromBookingGreenHour'].recordsets[0];
      console.log(this.greenHour);
    }).catch((err: any) => {
      console.log(err);
    });

    this.graphservice.savingsGreenPath().then((data) => {
      console.log(this.greenPath);
      this.greenPath = data['SavingsGreenPath'].recordsets[0];
      console.log(this.greenPath);
    }).catch((err: any) => {
      console.log(err);
    });

    this.graphservice.savingsfromGreenParking().then((data) => {
      console.log(this.greenParking);
      this.greenParking = data['SavingsfromGreenParking'].recordsets[0];
      console.log(this.greenParking);
    }).catch((err: any) => {
      console.log(err);
    });


  }
  
  onSelect(event) {
    console.log(event);
  }




}
