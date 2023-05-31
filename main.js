const { app, BrowserWindow, dialog, ipcMain } = require("electron");
const path = require("path");

// app           -> the desktop app
// browser window->different windows
// ==========================
console.log("backend is here");

// function to create window
const createWindow = function () {
  const mainWindow = new BrowserWindow({
    // added some options here for my main window
    width: 500,
    height: 500,
    icon: "logo.ico",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      // this is to make nodeJS usable in the browser
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });

  // load HTML -> to load the file
  mainWindow.loadFile(path.join(__dirname, "src/index.html"));
  // open devTools -> as we are working only
  // mainWindow.webContents.openDevTools();
  // change our title from the main here
  mainWindow.setTitle("ZAKKER");
  // remove menu bar
  mainWindow.setMenu(null);
  mainWindow.maximize();
  // #########
  // mainWindow.setIcon(iconPth);
};
app.on("ready", createWindow);

ipcMain.handle("open-file-dialog", async (event) => {
  const mainWindow = BrowserWindow.getFocusedWindow();
  const result = await dialog.showOpenDialog({
    properties: ["openFile", "multiSelections"],
    filters: [
      {
        name: "Documents",
        extensions: ["pdf", "docx", "xlsx", "pptx"],
      },
      {
        name: "Images",
        extensions: ["png", "jpeg"],
      },
    ],
  });
  if (!result.canceled) {
    const filePath = result.filePaths[0];
    mainWindow.webContents.send("selected-file", filePath);
  }
});
