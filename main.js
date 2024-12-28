const { app, BrowserWindow, Menu } = require("electron");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 900,
    height: 700,
  });

  win.loadFile("index.html");
};
Menu.setApplicationMenu(null);
app.whenReady().then(() => {
  createWindow();
});
