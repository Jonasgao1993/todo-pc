import { Component, OnInit } from '@angular/core';
import { LocalDBService } from '../../core/service/localDB/localDB.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {
  value = '1';
  constructor(private localDBService: LocalDBService) { }

  ngOnInit() {
    this.localDBService.getValue('name').then(
      value => {
        this.value = value;
      },
      error => {
        this.value = '错误';
      }
    );
  }

}
