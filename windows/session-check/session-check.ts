import { ipcMain, BrowserWindow, screen, shell } from 'electron';
import * as path from 'path';
import * as url from 'url';
import createMainWindow from '../main/main';
import createLoginWindow from '../login/login';

let win, serve;
const args = process.argv.slice(1);
serve = args.some(val => val === '--serve');

function createSessionCheckWindow(wins) {

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
    (event, credentials) => {
      console.log('SHOW_MAIN_AND_CLOSE_SESSION_CHECK捕获到了');
      if (!wins.session_check) { return; }
      createMainWindow(wins);
      wins.session_check.close();
      // globalWin.login = null // not need
    }
  );
  ipcMain.on(
    'SHOW_LOGIN_AND_CLOSE_SESSION_CHECK',
    (event, arg) => {
      console.log('SHOW_LOGIN_AND_CLOSE_SESSION_CHECK捕获到了');
      if (!wins.session_check) { return; }
      createLoginWindow(wins);
      wins.session_check.close();
      // globalWin.login = null // not need
    }
  );
  win.once('ready-to-show', () => {
    const ses = win.webContents.session;
    console.log(JSON.stringify(ses));
    win.show();
  });

  if (serve) {
    win.webContents.on('devtools-opened', () => {
      setImmediate(() => {
        win.focus();
      });
    });
    win.webContents.openDevTools();
  }

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    wins.session_check = null;
  });
  wins.session_check = win;
  return win;
}
export default createSessionCheckWindow;
