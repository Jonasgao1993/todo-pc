import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-session-check',
  templateUrl: './session-check.component.html',
  styleUrls: ['./session-check.component.less']
})
export class SessionCheckComponent implements OnInit {
  count = 4;
  constructor(private router: Router) { }

  ngOnInit() {
    this.countchange();
  }
  countchange() {
    setTimeout(() => {
      if (this.count !== 0) {
        this.count--;
        this.countchange();
      } else {
        this.router.navigate(['/login']);
      }
    }, 1000);
  }
}
