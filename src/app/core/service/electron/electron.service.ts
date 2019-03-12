import { Injectable } from '@angular/core';

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

  constructor() {
    // Conditional imports
    if (this.isElectron()) {
      this.ipcRenderer = window.require('electron').ipcRenderer;
      this.webFrame = window.require('electron').webFrame;
      this.remote = window.require('electron').remote;

      this.childProcess = window.require('child_process');
      this.fs = window.require('fs');
    }
  }

  isElectron = () => {
    return window && window.process && window.process.type;
  }
  // 判断当前窗口是佛是最大化
  isMaximized() {
    const win = this.remote.getCurrentWindow();
    if (!win.isMaximized) {
      return true;
    } else {
      return false;
    }
  }
  // 最小化窗口
  min() {
    const win = this.remote.getCurrentWindow();
    win.minimize();
  }
  // 最大化窗口
  max() {
    const win = this.remote.getCurrentWindow();
    win.maximize();
  }
  // 还原最大化窗口
  unmax() {
    const win = this.remote.getCurrentWindow();
    win.unmaximize();
  }
  // 关闭窗口
  close() {
    const win = this.remote.getCurrentWindow();
    win.close();
  }

}
