import { ipcMain, BrowserWindow, app } from 'electron';
import * as path from 'path';
import * as url from 'url';
import createMainWindow from '../main/main';

let win, serve;
const args = process.argv.slice(1);
serve = args.some(val => val === '--serve');

function createLoginWindow() {

  // const electronScreen = screen;
  // const size = electronScreen.getPrimaryDisplay().workAreaSize;

  // Create the browser window.
  win = new BrowserWindow({
    // width: size.width,
    // height: size.height,
    width: 600,
    height: 400,
    minWidth: 600,
    minHeight: 400,
    resizable: true,
    titleBarStyle: 'hiddenInset',
    frame: process.platform === 'darwin',
    webPreferences: {
      nodeIntegration: true,
    },
    show: false
  });

  if (serve) {
    require('electron-reload')(__dirname, {
      electron: require(path.join(__dirname, '../../node_modules/electron'))
    });
    win.loadURL('http://localhost:4200/#/login');
  } else {
    win.loadURL(url.format({
      pathname: path.join(__dirname, '../../dist/index.html'),
      protocol: 'file:',
      slashes: true,
      hash: '/login'
    }));
  }

  ipcMain.on(
    'SHOW_MAIN_AND_CLOSE_LOGIN',
    (event, credentials) => {
      if (!win) { return; }
      createMainWindow();
      win.destroy();
    }
  );
  win.once('ready-to-show', () => {
    win.show();
  });
  // 本地环境的话打开开发者工具
  if (serve) {
    win.webContents.openDevTools();
  }
  app.on('activate', () => {
    if (process.platform === 'darwin') {
      if (win) {
        win.show();
      }
    }
  });
  // app退出的时候执行，destroy不触发close事件
  app.on('before-quit', () => {
    if (process.platform === 'darwin') {
      if (win) {
        // 强制关闭窗口, 除了closed之外，close，unload 和 beforeunload 都不会被触发
        win.destroy();
      }
    }
  });
  // 页面关闭的时候执行
  win.on('close', (event) => {
    if (process.platform === 'darwin') {
      event.preventDefault();    // This will cancel the close
      win.hide();
    }
  });
  return win;
}
export default createLoginWindow;
