const { app, BrowserWindow, shell } = require("electron");
const windowStateKeeper = require("./windowStateKeeper.cjs");
const path = require("path");
const { fileURLToPath } = require("url");
const serve = require("electron-serve");

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// In development, use the monorepo node_modules, in production use the bundled one
const servePath = process.env.NODE_ENV === "development" 
  ? path.resolve(__dirname, "../../node_modules/electron-serve")
  : path.resolve(process.resourcesPath, "electron-serve");

const loadURL = serve({ 
  directory: path.join(__dirname, "source"),
  scheme: "app"
});

let myWindow = null;

async function createWindow() {
  const mainWindowStateKeeper = await windowStateKeeper("main");

  const mainWindow = new BrowserWindow({
    x: mainWindowStateKeeper.x,
    y: mainWindowStateKeeper.y,
    width: mainWindowStateKeeper.width,
    height: mainWindowStateKeeper.height,
    webPreferences: {
      enableRemoteModule: true,
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: true
    },
  });

  // TO-DO: Prevent links from opening in the app
  mainWindow.webContents.on("will-navigate", (e, destinationUrl) => {
    const isInternal =
      destinationUrl.startsWith("/") ||
      destinationUrl.startsWith("app://") ||
      destinationUrl.match("https://mnral.com");
    if (!isInternal) {
      e.preventDefault();
      shell.openExternal(destinationUrl);
    }
  });

  loadURL(mainWindow);

  // mainWindow.webContents.openDevTools();

  // let win = BrowserWindow.getAllWindows()[0];

  // If reduced below Minimum value
  // Error - 'zoomFactor' must be a double greater than 0.0
  mainWindow.webContents.setZoomFactor(1.0);

  // Upper Limit is working of 500 %
  mainWindow.webContents
    .setVisualZoomLevelLimits(1, 5)
    .then(console.log("Zoom Levels Have been Set between 100% and 500%"))
    .catch((err) => console.log(err));

  // Event listener for window focus
  mainWindow.webContents.on("focus", () => {
    if (mainWindow.isMinimized()) {
      mainWindow.restore();
    }
  });

  mainWindow.webContents.on("zoom-changed", (_event, zoomDirection) => {
    console.log(zoomDirection);
    var currentZoom = mainWindow.webContents.getZoomFactor();
    console.log("Current Zoom Factor - ", currentZoom);
    // console.log('Current Zoom Level at - '
    // , mainWindow.webContents.getZoomLevel());
    console.log("Current Zoom Level at - ", mainWindow.webContents.zoomLevel);

    if (zoomDirection === "in") {
      // mainWindow.webContents.setZoomFactor(currentZoom + 0.20);
      mainWindow.webContents.zoomFactor = currentZoom + 0.2;
    }

    if (zoomDirection === "out") {
      // mainWindow.webContents.setZoomFactor(currentZoom - 0.20);
      mainWindow.webContents.zoomFactor = currentZoom - 0.2;
    }
  });

  mainWindowStateKeeper.track(mainWindow);
  return mainWindow;
}

const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
} else {
  app.on(
    "second-instance",
    (event, commandLine, workingDirectory, additionalData) => {
      // Someone tried to run a second instance, we should focus our window.
      if (myWindow) {
        if (myWindow.isMinimized()) myWindow.restore();
        myWindow.focus();
      }
    },
  );

  app.whenReady().then(() => {
    createWindow().then((mainWindow) => {
      myWindow = mainWindow;
      mainWindow.webContents.send("ping", "whoooooooh!");
    });
  });
}
