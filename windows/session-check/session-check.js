"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var path = require("path");
var url = require("url");
var main_1 = require("../main/main");
var login_1 = require("../login/login");
var win, serve;
var args = process.argv.slice(1);
serve = args.some(function (val) { return val === '--serve'; });
function createSessionCheckWindow(wins) {
    // const electronScreen = screen;
    // const size = electronScreen.getPrimaryDisplay().workAreaSize;
    // Create the browser window.
    win = new electron_1.BrowserWindow({
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
    }
    else {
        win.loadURL(url.format({
            pathname: path.join(__dirname, '../../dist/index.html'),
            protocol: 'file:',
            slashes: true,
            hash: '/session-check'
        }));
    }
    electron_1.ipcMain.on('SHOW_MAIN_AND_CLOSE_SESSION_CHECK', function (event, credentials) {
        console.log('SHOW_MAIN_AND_CLOSE_SESSION_CHECK捕获到了');
        if (!wins.session_check) {
            return;
        }
        main_1.default(wins);
        wins.session_check.close();
        // globalWin.login = null // not need
    });
    electron_1.ipcMain.on('SHOW_LOGIN_AND_CLOSE_SESSION_CHECK', function (event, arg) {
        console.log('SHOW_LOGIN_AND_CLOSE_SESSION_CHECK捕获到了');
        if (!wins.session_check) {
            return;
        }
        login_1.default(wins);
        wins.session_check.close();
        // globalWin.login = null // not need
    });
    win.once('ready-to-show', function () {
        electron_1.session.defaultSession.cookies.get({}, function (error, cookies) {
            console.log(error, cookies);
        });
        win.show();
    });
    if (serve) {
        win.webContents.on('devtools-opened', function () {
            setImmediate(function () {
                win.focus();
            });
        });
        win.webContents.openDevTools();
    }
    // Emitted when the window is closed.
    win.on('closed', function () {
        // Dereference the window object, usually you would store window
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        wins.session_check = null;
    });
    wins.session_check = win;
    return win;
}
exports.default = createSessionCheckWindow;
//# sourceMappingURL=session-check.js.map