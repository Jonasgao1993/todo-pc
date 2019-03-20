import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ElectronService } from '../../../core/service/electron/electron.service';
import { TokenService } from '../../../core/service/token/token.service';
import * as EVENTS from '../../../shared/events/events';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  session = '999';
  constructor(private router: Router, private electronService: ElectronService,
    private tokenService: TokenService) {
    this.electronService.resize(900, 700, true);
  }

  ngOnInit() {
   this.session =  this.tokenService.getToken();

  }
  go() {
    // this.electronService.sendDirectToMain(EVENTS.SHOW_MAIN_AND_CLOSE_LOGIN);
    this.tokenService.setToken('123456789');
    this.session = this.tokenService.getToken();

  }
}
