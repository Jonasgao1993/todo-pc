import { NgModule, Optional, SkipSelf } from '@angular/core';
import { LocalStorageService } from 'angular-web-storage';
import { CookieService } from 'ngx-cookie-service';
import { TokenService } from './service/token/token.service';
import { HttpService } from './service/http/http.service';
import { ElectronService } from './service/electron/electron.service';
import { LocalDBService } from './service/localDB/localDB.service';
import { CyptoService } from './service/crypto/cypto.service';
<<<<<<< HEAD
import { CommonModule } from '@angular/common';
=======
>>>>>>> 7953cb6f50771cf83dfbf9a1f984ce2a397f52dc

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
<<<<<<< HEAD
    CyptoService,
    CommonModule
=======
    CyptoService
>>>>>>> 7953cb6f50771cf83dfbf9a1f984ce2a397f52dc
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
