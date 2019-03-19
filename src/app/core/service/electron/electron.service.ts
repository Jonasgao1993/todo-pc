import { Injectable, NgZone } from '@angular/core';
import { ipcRenderer, webFrame, remote, app } from 'electron';
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
  constructor(private _ngzone: NgZone) {
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
  // 检测当前是否是Electron运行模式
  isElectron = () => {
    return window && window.process && window.process.type;
  }
  // 窗口的最大化、最小化和关闭调整
  adjustWin(type) {
    if (this.isElectron()) {
      const win = this.remote.getCurrentWindow();
      switch (type) {
        // 最大化
        case 'MAX':
          win.maximize();
          break;
        // 最小化
        case 'MIN':
          win.minimize();
          break;
        // 最大化还原
        case 'UNMAX':
          win.unmaximize();
          break;
        // 窗口关闭
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
    // 监听当窗体最大化的时候执行
    win.on('maximize', () => {
      // 对于Electron来说，状态的变更在Angular的自动变更检测之外，因此需要被动进行变更检测
      this._ngzone.run(() => {
        this.isMaximized = this.remote.getCurrentWindow().isMaximized();
      });
    });
    // 监听当窗口取消最大化的时候执行
    win.on('unmaximize', () => {
      this._ngzone.run(() => {
        this.isMaximized = this.remote.getCurrentWindow().isMaximized();
      });
    });
  }
  getPath() {
    const APP = process.type === 'renderer' ? remote.app : app;
    return APP.getPath('userData');
  }
}
