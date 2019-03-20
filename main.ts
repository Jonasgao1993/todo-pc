import { app, BrowserWindow } from 'electron';
import createSessionCheckWindow from './windows/session-check/session-check';
const win = {
  session_check: null,
  login: null,
  main: null
};
function createWindow() {
  if (win.login || win.main) { return; }
  createSessionCheckWindow(win);
}
try {
  app.requestSingleInstanceLock();
  app.on('second-instance', function (argv, cwd) {
    if (win.session_check) {
      win.session_check.focus();
    }
    if (win.login) {
      win.login.focus();
    }
    if (win.main) {
      if (win.main.isMinimized()) { win.main.restore(); }
      win.main.focus();
    }
  });
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', createWindow);

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    } else {
      app.hide();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });

} catch (e) {
  // Catch Error
  // throw e;
}
