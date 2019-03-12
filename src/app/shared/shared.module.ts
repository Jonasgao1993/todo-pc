import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebviewDirective } from './directives/webview.directive';
import { NgZorroAntdModule } from 'ng-zorro-antd';

@NgModule({
  imports: [
    CommonModule,NgZorroAntdModule
  ],
  declarations: [WebviewDirective],
  exports:[NgZorroAntdModule]
})
export class SharedModule { }
