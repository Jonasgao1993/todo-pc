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
    this.session = JSON.stringify(this.tokenService.session);
    console.log('1');
  }
  get() {
    // const t = this.localDBService.get('setting');
    // console.log(JSON.stringify(t));
    this.tokenService.getToken().then(
      data => {
        if (data) {
          this.session = JSON.stringify(data);
        }
      }
    );
  }

}
