# Introduction

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 7953cb6f50771cf83dfbf9a1f984ce2a397f52dc
 Angular 7 、Electron (Typescript + Less + Hot Reload) 、NG_ZOORO（Ant Design UI Framework）、SQLite for creating Desktop applications.

Currently runs with:

- Angular v7.2.0
- Electron v4.0.0
- SQLite 3
- Electron Builder v20.28.1
=======
Bootstrap and package your project with Angular 8 and Electron (Typescript + SASS + Hot Reload) for creating Desktop applications.

Currently runs with:

- Angular v8.0.0
- Electron v5.0.2
- Electron Builder v20.41.0
>>>>>>> angular-electron-master

With this sample, you can :

- Run your app in a local development environment with Electron & Hot reload
- Run your app in a production environment
- Package your app into an executable file for Linux, Windows & Mac

/!\ Angular 8.0 CLI needs Node 10.9 or later to work.

## Getting Started

Clone this repository locally :

``` bash
git clone https://github.com/maximegris/angular-electron.git
```

Install dependencies with npm :

``` bash
npm install
```

There is an issue with `yarn` and `node_modules` that are only used in electron on the backend when the application is built by the packager. Please use `npm` as dependencies manager.


If you want to generate Angular components with Angular-cli , you **MUST** install `@angular/cli` in npm global context.
Please follow [Angular-cli documentation](https://github.com/angular/angular-cli) if you had installed a previous version of `angular-cli`.

``` bash
npm install -g @angular/cli
```

## To build for development

- **in a terminal window** -> npm start

Voila! You can use your Angular + Electron app in a local development environment with hot reload !

The application code is managed by `main.ts`. In this sample, the app runs with a simple Angular App (http://localhost:4200) and an Electron window.
The Angular component contains an example of Electron and NodeJS native lib import.
You can disable "Developer Tools" by commenting `win.webContents.openDevTools();` in `main.ts`.

## Included Commands

|Command|Description|
|--|--|
|`npm run ng:serve:web`| Execute the app in the browser |
|`npm run build`| Build the app. Your built files are in the /dist folder. |
|`npm run build:prod`| Build the app with Angular aot. Your built files are in the /dist folder. |
|`npm run electron:local`| Builds your application and start electron
|`npm run electron:linux`| Builds your application and creates an app consumable on linux system |
|`npm run electron:windows`| On a Windows OS, builds your application and creates an app consumable in windows 32/64 bit systems |
|`npm run electron:mac`|  On a MAC OS, builds your application and generates a `.app` file of your application that can be run on Mac |

需要SQLite 3 Windows需要安装VS2017

Windows配置SQLite 3 配置方法
1、安装Python 2.7环境，请选择把python加入系统变量path（安装界面勾选）；
2、安装VS 2017，因为运行需要C/C++环境
3、npm install -g node-gyp
4、npm install -g node-pre-gyp
5、npm install --global --production windows-build-tools
6、npm install sqlite3 --save
7、cd到node_module/sqlite3
8、node-gyp rebuild --target=4.0.0 --arch=x64 --target_platform=win32 --dist-url=https://atom.io/download/electron/ --module_name=node_sqlite3 --module_path=../lib/binding/electron-v4.0-win32-x64
 

Mac 配置SQLite 3
 1、npm install
 2、执行npm run rebuild
