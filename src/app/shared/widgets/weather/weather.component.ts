import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.less']
})
export class WeatherComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {
    const ip = "124.127.108.133";
    const url = "http://ip.taobao.com/service/getIpInfo.php?ip=" + ip;
    this.http.get(url).subscribe(res => {
      console.warn(JSON.stringify(res));
    });

  }

}
