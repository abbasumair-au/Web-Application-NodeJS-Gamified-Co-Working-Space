import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'src/app/services/notifications.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  constructor(private bookgreenzoneservice:NotificationsService, private router: Router) { }

  notifications = [];

  ngOnInit(): void {
    let userId = sessionStorage.getItem("userId");
    if(userId === 'admin'){
      this.bookgreenzoneservice.getAllNotifications(userId).then((data) => {
        this.notifications= data['allNotifications'].recordsets[0];
        console.log(this.notifications);
      }).catch((err: any) => {
        console.log(err);
      });  
    }else{
      this.bookgreenzoneservice.NotificationsDetails(userId).then((data) => {
        this.notifications= data['NotificationsDetails'].recordsets[0];
        console.log(this.notifications);
      }).catch((err: any) => {
        console.log(err);
      });  
    }
  }

}
