import { Injectable, NgZone } from '@angular/core';

// If you import a module but never use any of the imported values other than as TypeScript types,
// the resulting javascript file will look as if you never imported the module at all.
import { ipcRenderer, webFrame, remote } from 'electron';
import * as childProcess from 'child_process';
import * as fs from 'fs';

@Injectable()
export class ElectronService {
  ipcRenderer: typeof ipcRenderer;
  webFrame: typeof webFrame;
  remote: typeof remote;
  childProcess: typeof childProcess;
  fs: typeof fs;
  // 当前窗口是否是最大化
  isMaximized = false;

  constructor( private _ngzone: NgZone) {
    // Conditional imports
    if (this.isElectron()) {
      this.ipcRenderer = window.require('electron').ipcRenderer;
      this.webFrame = window.require('electron').webFrame;
      this.remote = window.require('electron').remote;
      this.listenWin();
      this.childProcess = window.require('child_process');
      this.fs = window.require('fs');
    }
  }

  isElectron = () => {
    return window && window.process && window.process.type;
  }
  adjustWin(type) {
    // this.isMaximized = !this.isMaximized;
    if (this.isElectron()) {
      const win = this.remote.getCurrentWindow();
      switch (type) {
        case 'MAX':
          win.maximize();
          break;
        case 'MIN':
          win.minimize();
          break;
        case 'UNMAX':
          win.unmaximize();
          break;
        case 'CLOSE':
          win.close();
          break;
        default:
          break;
      }
    }
  }
  listenWin() {
    const win = this.remote.getCurrentWindow();
    win.on('maximize', () => {
      this._ngzone.run(() => {
        this.isMaximized = this.remote.getCurrentWindow().isMaximized();
      });

      console.log('变大了');
    });
    win.on('unmaximize', () => {
      this._ngzone.run(() => {
        this.isMaximized = this.remote.getCurrentWindow().isMaximized();
      });
      console.log('变小了');
    });
  }
}
