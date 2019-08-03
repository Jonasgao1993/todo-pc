import { app, BrowserWindow, Menu, Tray } from 'electron';
import * as path from 'path';
import * as url from 'url';

let win, serve;
const args = process.argv.slice(1);
serve = args.some(val => val === '--serve');

function createMainWindow() {

  // const electronScreen = screen;
  // const size = electronScreen.getPrimaryDisplay().workAreaSize;

  // Create the browser window.
  win = new BrowserWindow({
    // width: size.width,
    // height: size.height,
    width: 1050,
    height: 700,
    minWidth: 1050,
    minHeight: 700,
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
      // electron: require(`${__dirname}/node_modules/electron`)
      electron: require(path.join(__dirname, '../../node_modules/electron'))
    });
    win.loadURL('http://localhost:4200/#/');
  } else {
    win.loadURL(url.format({
      pathname: path.join(__dirname, '../../dist/index.html'),
      protocol: 'file:',
      slashes: true,
      hash: '/'
    }));
  }
  win.setMenu(null)
  win.once('ready-to-show', () => {
    win.show();
  });

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
  app.on('before-quit', () => {
    if (process.platform === 'darwin') {
      if (win) {
        // 强制关闭窗口, 除了closed之外，close，unload 和 beforeunload 都不会被触发
        win.destroy();
      }
    }
  });
  win.on('close', (event) => {
    if (process.platform === 'darwin') {
      event.preventDefault();    // This will cancel the close
      win.hide();
    }
  });
  return win;
}
export default createMainWindow;
