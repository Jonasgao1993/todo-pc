import { Component, OnInit } from '@angular/core';
import { ElectronService } from '../../../core/service/electron/electron.service';
import * as EVENTS from '../../../shared/events/events';
import { TokenService } from '../../../core/service/token/token.service';

@Component({
  selector: 'app-session-check',
  templateUrl: './session-check.component.html',
  styleUrls: ['./session-check.component.less']
})
export class SessionCheckComponent implements OnInit {
  count = 4;
  constructor(private electronService: ElectronService, private tokenService: TokenService) { }

  ngOnInit() {
    this.countchange();
  }
  countchange() {
    setTimeout(() => {
      if (this.count !== 0) {
        this.count--;
        this.countchange();
      } else {
        this.sessionCheck();
        // this.electronService.sendDirectToMain(EVENTS.SHOW_LOGIN_AND_CLOSE_SESSION_CHECK);
      }
    }, 1000);
  }
  sessionCheck() {
    console.log('准备执行了');
    this.tokenService.getToken().then(
      data => {
        if (data) {
          this.electronService.sendDirectToMain(EVENTS.SHOW_MAIN_AND_CLOSE_SESSION_CHECK);
        } else {
          this.electronService.sendDirectToMain(EVENTS.SHOW_LOGIN_AND_CLOSE_SESSION_CHECK);
        }
      }
    );
  }
}
