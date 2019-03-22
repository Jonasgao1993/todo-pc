import { ipcMain, BrowserWindow, app } from 'electron';
import * as path from 'path';
import * as url from 'url';
import createMainWindow from '../main/main';
import createLoginWindow from '../login/login';

let win, serve;
const args = process.argv.slice(1);
serve = args.some(val => val === '--serve');

function createSessionCheckWindow() {

  // const electronScreen = screen;
  // const size = electronScreen.getPrimaryDisplay().workAreaSize;

  // Create the browser window.
  win = new BrowserWindow({
    // width: size.width,
    // height: size.height,
    width: 300,
    height: 300,
    minWidth: 300,
    minHeight: 300,
    resizable: false,
    frame: false,
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
    win.loadURL('http://localhost:4200/#/session-check');
  } else {
    win.loadURL(url.format({
      pathname: path.join(__dirname, '../../dist/index.html'),
      protocol: 'file:',
      slashes: true,
      hash: '/session-check'
    }));
  }

  ipcMain.on(
    'SHOW_MAIN_AND_CLOSE_SESSION_CHECK',
    () => {
      console.log('SHOW_MAIN_AND_CLOSE_SESSION_CHECK捕获到了');
      if (!win) { return; }
      createMainWindow();
      win.destroy();
      // globalWin.login = null // not need
    }
  );
  ipcMain.on(
    'SHOW_LOGIN_AND_CLOSE_SESSION_CHECK',
    () => {
      console.log('SHOW_LOGIN_AND_CLOSE_SESSION_CHECK捕获到了');
      if (!win) { return; }
      createLoginWindow();
      win.destroy();
      // globalWin.login = null // not need
    }
  );
  win.once('ready-to-show', () => {
    win.show();
  });

  // if (serve) {
  //   win.webContents.openDevTools();
  // }
  return win;
}
export default createSessionCheckWindow;
