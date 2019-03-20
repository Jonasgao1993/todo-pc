import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ElectronService } from '../../../core/service/electron/electron.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  constructor(private router: Router, private electronService: ElectronService) {
    this.electronService.resize(900, 700, true);
  }

  ngOnInit() {
  }
  go() {
    this.router.navigate(['/dashboard']);
  }

}
