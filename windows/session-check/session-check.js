"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var path = require("path");
var url = require("url");
var win, serve;
var args = process.argv.slice(1);
serve = args.some(function (val) { return val === '--serve'; });
function createSessionCheckWindow() {
    var electronScreen = electron_1.screen;
    var size = electronScreen.getPrimaryDisplay().workAreaSize;
    // Create the browser window.
    win = new electron_1.BrowserWindow({
        x: 0,
        y: 0,
        // width: size.width,
        // height: size.height,
        width: 1100,
        height: 768,
        minWidth: 300,
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
            // electron: require(`${__dirname}/node_modules/electron`)
            electron: require(path.join(__dirname, '../../node_modules/electron'))
        });
        win.loadURL('http://localhost:4200/');
    }
    else {
        win.loadURL(url.format({
            pathname: path.join(__dirname, '../../dist/index.html'),
            protocol: 'file:',
            slashes: true,
            hash: '/session-check'
        }));
    }
    win.once('ready-to-show', function () {
        win.show();
    });
    if (serve) {
        win.webContents.openDevTools();
    }
    // Emitted when the window is closed.
    win.on('closed', function () {
        // Dereference the window object, usually you would store window
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null;
    });
}
exports.default = createSessionCheckWindow;
//# sourceMappingURL=session-check.js.map