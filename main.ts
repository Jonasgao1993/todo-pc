import { app, BrowserWindow } from 'electron';
import createSessionCheckWindow from './windows/session-check/session-check';
function createWindow() {
  createSessionCheckWindow();
}
try {
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
// 判断是否是Mac系统
function isMac() {
  if (process.platform === 'darwin') {
    return true;
  } else {
    return false;
  }
}
