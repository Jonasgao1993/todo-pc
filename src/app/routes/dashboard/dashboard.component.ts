import { Component, OnInit } from '@angular/core';
import { LocalDBService } from '../../core/service/localDB/localDB.service';
import { TokenService } from '../../core/service/token/token.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {
  value: any;
  session: any;
  token = {
    OAUTH_TOKEN: '939484gff',
    TIMESTAMP: 44444,
    EXPIREDTIME: 7200
  }
  constructor(private localDBService: LocalDBService, private tokenService: TokenService) { }

  ngOnInit() {
  }
  get() {
    this.tokenService.getToken().then(
      data => {
        if (data) {
          this.session = data;
        }
      }
    );
  }
  set() {
    this.tokenService.setToken(this.token);
  }
  inform() {
    const notification = {
      title: '基本通知',
      body: '短消息部分'
    };
    const myNotification = new Notification(notification.title, { body: notification.body });
  }
}
