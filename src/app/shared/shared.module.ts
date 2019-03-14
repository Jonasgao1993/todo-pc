import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebviewDirective } from './directives/webview.directive';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { HttpClientModule } from '@angular/common/http';
// widgets
import { WeatherComponent } from './widgets/weather/weather.component';
import { FireworkComponent } from './widgets/firework/firework.component';
import { CountUpModule } from 'countup.js-angular2';

@NgModule({
  imports: [
    CommonModule, NgZorroAntdModule, HttpClientModule,CountUpModule
  ],
  declarations: [WebviewDirective, WeatherComponent, FireworkComponent],
  exports: [NgZorroAntdModule, WeatherComponent, FireworkComponent]
})
export class SharedModule { }
