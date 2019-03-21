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
  constructor(private localDBService: LocalDBService, private tokenService: TokenService) { }

  ngOnInit() {
  }
  get() {
    this.tokenService.getToken().then(
      data => {
        if (data) {
          this.session = JSON.stringify(data);
        }
      }
    );
  }
  set() {
    this.tokenService.setToken({ 'OAUTH_TOKEN': '1esrdtfyguhij', 'EXPIREDTIME': 7200 });
  }
}
