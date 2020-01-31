// Modules
const { app, BrowserWindow, Notification } = require("electron");
const updater = require("./updater");
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

// Create a new BrowserWindow when `app` is ready
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: { nodeIntegration: true }
  });

  // Load index.html into the new BrowserWindow
  //mainWindow.loadFile("index.html");
  mainWindow.loadURL("https://app.twork.io/login");

  // Open DevTools - Remove for PRODUCTION!
  //mainWindow.webContents.openDevTools();

  //Add for PRODUCTION!
  mainWindow.webContents.on("devtools-opened", () => {
    mainWindow.webContents.closeDevTools();
  });

  setTimeout(updater.check, 2000);
  global.mainWindow = mainWindow;

  //Notification
  setTimeout(() => {
    const notification = new Notification({
      title: "Twork",
      body: "Welcome to Twork app"
      //icon: `icon.png`
    });
    notification.show();
  }, 2000);
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
