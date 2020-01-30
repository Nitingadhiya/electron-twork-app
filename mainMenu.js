module.exports = [
  {
    label: "Electorn",
    submenu: [
      {
        label: "Item 1 ***",
        click: () => {
          console.log("Hello how are you!");
        },
        accelerator: "shift+Alt+G"
      },
      {
        label: "Item 2 ***",
        submenu: [{ label: "sub item", role: "copy" }]
      }
    ]
  },
  {
    label: "Edit",
    submenu: [
      {
        role: "undo"
      },
      {
        role: "redo"
      },
      {
        role: "copy"
      },
      {
        role: "paste"
      }
    ]
  }
];
