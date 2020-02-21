// Modules
const {
  app,
  BrowserWindow,
  Notification,
  TouchBar,
  shell
} = require("electron");
const path = require("path");
const url = require("url");
const updater = require("./updater");
const { TouchBarLabel, TouchBarButton, TouchBarSpacer } = TouchBar;
require("./menu/mainmenu");
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

// Reload button
const reload = new TouchBarButton({
  label: "Reload",
  backgroundColor: "#FFD700",
  icon: path.join(__dirname, "trayTemplate@2x.png"),
  iconPosition: "left",
  click: () => {
    mainWindow.reload();
  }
});
const appName = new TouchBarButton({
  label: "Welcome to Twork",
  backgroundColor: "#7851A9",
  icon: path.join(__dirname, "icon.png"),
  iconPosition: "left"
});
const touchBar = new TouchBar({
  items: [appName, new TouchBarSpacer({ size: "flexible" }), reload]
});

// Create a new BrowserWindow when `app` is ready
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: { nodeIntegration: true }
  });

  mainWindow.webContents.on("new-window", function(event, url) {
    event.preventDefault();
    shell.openExternal(url);
  });

  // Load index.html into the new BrowserWindow
  //mainWindow.loadFile("index.html");
  mainWindow.loadURL("https://app.twork.io");

  // mainWindow.loadURL(
  //   url.format({
  //     pathname: path.join(__dirname, "index.html"),
  //     protocol: "file",
  //     slashes: true
  //   })
  // );
  setTimeout(() => {
    mainWindow.setTouchBar(touchBar);
  }, 300);
  // Open DevTools - Remove for PRODUCTION!
  mainWindow.webContents.openDevTools();

  //Add for PRODUCTION!
  mainWindow.webContents.on("devtools-opened", () => {
    //mainWindow.webContents.closeDevTools();
  });

  setTimeout(updater.check, 2000);
  global.mainWindow = mainWindow;

  //Notification
  // setTimeout(() => {
  //   const notification = new Notification({
  //     title: "Twork",
  //     body: "Welcome to Twork app"
  //     //icon: `icon.png`
  //   });
  //   notification.show();
  // }, 2000);
  // Listen for window being closed
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

// Electron `app` is ready
app.on("ready", () => {
  createWindow();
  // check for update after x seconds
  // setTimeout(updater.check, 2000);
});

// Quit when all windows are closed - (Not macOS - Darwin)
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

// When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
app.on("activate", () => {
  if (mainWindow === null) createWindow();
});
