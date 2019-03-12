import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebviewDirective } from './directives/webview.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [WebviewDirective]
})
export class SharedModule { }
