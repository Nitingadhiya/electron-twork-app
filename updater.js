// Modules
const { dialog, BrowserWindow, ipcMain } = require("electron");
const { autoUpdater } = require("electron-updater");

const os = require("os");
const appVersion = require("./package.json").version;
const platform = `${os.platform()}_${os.arch()}`;
const http = require("http");

// // Enable logging
autoUpdater.logger = require("electron-log");
autoUpdater.logger.transports.file.level = "info";

// Disable auto downloading
autoUpdater.autoDownload = false;

// Check for updates
exports.check = () => {
  //autoUpdater.logger.info("autoUpdater.getFeedURL()");
  var request = http.get(
    "http://teamtreehouse.com/" + "username" + ".json",
    function(response) {
      var body = "";
      response.on("data", function(chunk) {
        body += chunk;
      });
      response.on("end", function() {
        console.log(response.statusCode);
        if (response.statusCode === 200) {
        }
      });
    }
  );

  autoUpdater.logger.info(appVersion);

  return;

  // Start update check
  autoUpdater.checkForUpdates();
  let downloadProgress = 0;
  // Listen for download (update) found
  autoUpdater.on("update-available", () => {
    // Track progress percent

    // Prompt user to update
    dialog.showMessageBox(
      {
        type: "info",
        title: "Update Available",
        message:
          "A new version of Twork is available. Do you want to update now?",
        buttons: ["Update", "No"]
      },
      buttonIndex => {
        // If not 'Update' button, return
        if (buttonIndex !== 0) return;

        // Else start download and show download progress in new window
        autoUpdater.downloadUpdate();

        // Create progress window
        let progressWin = new BrowserWindow({
          width: 250,
          height: 50,
          useContentSize: true,
          autoHideMenuBar: true,
          maximizable: false,
          fullscreen: false,
          fullscreenable: false,
          resizable: false,
          webPreferences: { nodeIntegration: true }
        });
        // Load progress HTML
        progressWin.loadURL(`file://${__dirname}/progress.html`);

        // Handle win close
        progressWin.on("closed", () => {
          progressWin = null;
        });

        // Listen for completed update download
        autoUpdater.on("update-downloaded", () => {
          // Close progressWin
          if (progressWin) progressWin.close();

          // Prompt user to quit and install update
          dialog.showMessageBox(
            {
              type: "info",
              title: "Update Ready",
              message: "A new version of Twork is ready. Quit and install now?",
              buttons: ["Yes", "Later"]
            },
            buttonIndex => {
              // Update if 'Yes'
              if (buttonIndex === 0) autoUpdater.quitAndInstall();
            }
          );
        });
      }
    );
  });
  // Track download progress on autoUpdater
  autoUpdater.on("download-progress", d => {
    downloadProgress = d.percent;
    //autoUpdater.logger.info(downloadProgress);
  });
  // Listen for preogress request from progressWin
  ipcMain.on("download-progress-request", e => {
    e.returnValue = downloadProgress;
    global.mainWindow.setProgressBar(downloadProgress / 100);
  });
};
