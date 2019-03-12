import 'reflect-metadata';
import '../polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClient } from '@angular/common/http';

// NG Translate
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// NgZorro
import { NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';

// In Application
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HttpService } from './core/service/http/http.service';
import { RoutesModule } from './routes/routes.module';
import { LayoutModule } from './layout/layout.module';
import { SharedModule } from './shared/shared.module';
registerLocaleData(zh);

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    RoutesModule,
    LayoutModule,
    CoreModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    }),
    BrowserAnimationsModule
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN },
  { provide: HTTP_INTERCEPTORS, useClass: HttpService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
