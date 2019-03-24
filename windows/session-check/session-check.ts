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
    width: 300,
    height: 300,
    minWidth: 300,
    minHeight: 300,
    resizable: false,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
    },
    show: true
  });
  if (serve) {
    require('electron-reload')(__dirname, {
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
      if (!win) { return; }
      createMainWindow();
      win.destroy();
    }
  );
  ipcMain.on(
    'SHOW_LOGIN_AND_CLOSE_SESSION_CHECK',
    () => {
      if (!win) { return; }
      createLoginWindow();
      win.destroy();
    }
  );
  win.once('ready-to-show', () => {
    win.show();
  });
  return win;
}
export default createSessionCheckWindow;
