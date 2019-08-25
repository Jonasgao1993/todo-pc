import { NgModule, Optional, SkipSelf } from '@angular/core';
import { LocalStorageService } from 'angular-web-storage';
import { CookieService } from 'ngx-cookie-service';
import { TokenService } from './service/token/token.service';
import { HttpService } from './service/http/http.service';
import { ElectronService } from './service/electron/electron.service';
import { LocalDBService } from './service/localDB/localDB.service';
import { CyptoService } from './service/crypto/cypto.service';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
  ],
  providers: [
    LocalStorageService,
    TokenService,
    CookieService,
    HttpService,
    ElectronService,
    LocalDBService,
    CyptoService,
    CommonModule
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
