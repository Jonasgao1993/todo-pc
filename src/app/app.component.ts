import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { ElectronService } from './core/service/electron/electron.service';
import { TranslateService } from '@ngx-translate/core';
import { AppConfig } from '../environments/environment';
import { Router, NavigationEnd } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent implements OnInit {
  constructor(
    public electronService: ElectronService,
    private translate: TranslateService,
    el: ElementRef,
    renderer: Renderer2,
    private router: Router,
    private modalSrv: NzModalService) {

    translate.setDefaultLang('en');
    console.log('AppConfig', AppConfig);

    if (electronService.isElectron) {
      console.log(process.env);
      console.log('Mode electron');
      console.log('Electron ipcRenderer', electronService.ipcRenderer);
      console.log('NodeJS childProcess', electronService.childProcess);
    } else {
      console.log('Mode web');
    }
  }
  ngOnInit() {
    this.router.events
      .pipe(filter(evt => evt instanceof NavigationEnd))
      .subscribe(() => {
        this.modalSrv.closeAll();
      });
  }
}
