const { Menu } = require("electron");
const electron = require("electron");
const app = electron.app;
const isMac = process.platform === "darwin";

const template = [
  {
    label: "File",
    submenu: [isMac ? { role: "close" } : { role: "quit" }]
  },
  {
    label: "Edit",
    submenu: [
      {
        role: "undo",
        label: "Undo"
      },
      {
        role: "redo",
        label: "Redo"
      },
      {
        type: "separator"
      },
      {
        role: "cut",
        label: "Cut"
      },
      {
        role: "copy",
        label: "Copy"
      },
      {
        role: "paste",
        label: "Paste"
      },
      {
        role: "delete",
        label: "Delete"
      },
      {
        role: "selectall",
        label: "Select all"
      }
    ]
  },
  {
    label: "View",
    submenu: [
      {
        role: "Reload",
        label: "Reload"
      },
      {
        type: "separator"
      },
      {
        role: "togglefullscreen",
        label: "Toggle fullscreen"
      },
      {
        role: "resetzoom",
        label: "Actual size"
      },
      {
        role: "zoomin",
        label: "Zoom in"
      },
      {
        role: "zoomout",
        label: "Zoom out"
      }
    ]
  },
  {
    role: "window",
    label: "Window",
    submenu: [
      {
        role: "minimize",
        label: "Minimize"
      },
      {
        role: "close",
        label: "Close"
      }
    ]
  },
  {
    role: "help",
    label: "Help",
    submenu: [
      {
        label: "Go to Website",
        click() {
          require("electron").shell.openExternal("https://app.twork.io/login");
        }
      }
    ]
  }
];

if (process.platform === "darwin") {
  const name = app.getName();
  template.unshift({
    label: name,
    submenu: [
      {
        role: "about",
        label: "About" + " " + app.getName()
      },
      {
        type: "separator"
      },
      {
        role: "services",
        label: "Services",
        submenu: []
      },
      {
        type: "separator"
      },
      {
        role: "hide",
        label: "Hide" + " " + app.getName()
      },
      {
        role: "hideothers",
        label: "Hide others"
      },
      {
        role: "unhide",
        label: "Unhide"
      },
      {
        type: "separator"
      },
      {
        role: "quit",
        label: "Quit" + " " + app.getName()
      }
    ]
  });
}

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);
