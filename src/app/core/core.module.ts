

import { NgModule, Optional, SkipSelf } from '@angular/core';
import { LocalStorageService } from 'angular-web-storage';
import { CookieService } from 'ngx-cookie-service';
import { TokenService } from './service/token/token.service';
import { HttpService } from './service/http/http.service';
import { ElectronService } from './service/electron/electron.service';




@NgModule({
  imports: [
  ],
  providers: [
    LocalStorageService,
    TokenService,
    CookieService,
    HttpService,
    ElectronService
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
  }
}
