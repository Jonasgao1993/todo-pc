import { Component, OnInit, NgZone } from '@angular/core';
import { HttpClient, JsonpInterceptor } from '@angular/common/http';
declare let AMap: any;

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.less']
})
export class WeatherComponent implements OnInit {
  weatherCity = '获取中';
  temperature = 0;
  constructor(private _ngzone: NgZone) { }

  ngOnInit() {
    const that = this;
    AMap.plugin('AMap.CitySearch', function () {
      const citySearch = new AMap.CitySearch();
      citySearch.getLocalCity(function (status, result) {
        that._ngzone.run(() => {
          if (status === 'complete' && result.info === 'OK') {
            // 查询成功，result即为当前所在城市信息
            console.log(JSON.stringify(result));
            that.weatherCity = result.city;
            AMap.plugin('AMap.Weather', function () {
              // 创建天气查询实例
              const weather = new AMap.Weather();
              // 执行实时天气信息查询
              weather.getLive(result.city, function (err, data) {
                console.log(data);
                that._ngzone.run(() => {
                  that.temperature = Number(data.temperature);
                })
              });
            });
          } else {
            that.weatherCity = '获取位置失败';
          }
        });
      });
    })
  }
}
