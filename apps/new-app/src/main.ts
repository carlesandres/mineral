import { app, BrowserWindow } from "electron";
import path from "node:path";
// import started from 'electron-squirrel-startup';
import serve from "electron-serve";

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
// if (started) {
//   app.quit();
// }

const __dirname = path.dirname(__filename);
const sourcePath = path.resolve(__dirname, "../../source");
console.log("sourcePath", sourcePath);

console.log("__dirname", "__dirname");
const loadURL = serve({
  directory: sourcePath,
  scheme: "app",
});

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  loadURL(mainWindow);
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
