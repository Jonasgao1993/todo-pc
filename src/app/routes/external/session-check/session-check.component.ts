import { Component, OnInit } from '@angular/core';
import { ElectronService } from '../../../core/service/electron/electron.service';
import * as EVENTS from '../../../shared/events/events';

@Component({
  selector: 'app-session-check',
  templateUrl: './session-check.component.html',
  styleUrls: ['./session-check.component.less']
})
export class SessionCheckComponent implements OnInit {
  count = 4;
  constructor(private electronService: ElectronService) { }

  ngOnInit() {
    this.countchange();
  }
  countchange() {
    setTimeout(() => {
      if (this.count !== 0) {
        this.count--;
        this.countchange();
      } else {
        this.electronService.sendDirectToMain(EVENTS.SHOW_LOGIN_AND_CLOSE_SESSION_CHECK);
      }
    }, 1000);
  }
}
