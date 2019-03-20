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
    // 如果是Electron模式下，才导入
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
  // 关闭当前窗口
  closeWin() {
    const win = this.remote.getCurrentWindow();
    win.close();
  }
  // 最大化当前窗口
  maxWin() {
    const win = this.remote.getCurrentWindow();
    win.maximize();
  }
  // 取消最大化当前窗口
  unMaxWin() {
    const win = this.remote.getCurrentWindow();
    win.unmaximize();
  }
  // 最小化当前窗口
  minWin() {
    const win = this.remote.getCurrentWindow();
    win.minimize();
  }
  listenWin() {
    const win = this.remote.getCurrentWindow();
    // 监听当前窗体最大化的时候执行
    win.on('maximize', () => {
      // 对于Electron来说，状态的变更在Angular的自动变更检测之外，因此需要被动进行变更检测
      this._ngzone.run(() => {
        this.isMaximized = this.remote.getCurrentWindow().isMaximized();
      });
    });
    // 监听当前窗口取消最大化的时候执行
    win.on('unmaximize', () => {
      this._ngzone.run(() => {
        this.isMaximized = this.remote.getCurrentWindow().isMaximized();
      });
    });
  }
  // 或得当前系统userData路径
  getPath() {
    const APP = process.type === 'renderer' ? remote.app : app;
    return APP.getPath('userData');
  }
  // 重设当前窗口的大小
  resize(width: number, height: number, animate?: boolean) {
    // const win = this.remote.getCurrentWindow();
    // win.setSize(width, height, animate);
  }
  // 给主进程发送指令
  sendDirectToMain(event) {
    ipcRenderer.send(event, '');
  }
}
