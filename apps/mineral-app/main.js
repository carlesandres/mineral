const { app, BrowserWindow } = require("electron");
const minimist = require("minimist");
const args = minimist(process.argv.slice(2));
const windowStateKeeper = require("./windowStateKeeper");

async function createWindow() {
  const mainWindowStateKeeper = await windowStateKeeper("main");

  const mainWindow = new BrowserWindow({
    x: mainWindowStateKeeper.x,
    y: mainWindowStateKeeper.y,
    width: mainWindowStateKeeper.width,
    height: mainWindowStateKeeper.height,
    webPreferences: {
      enableRemoteModule: true,
    },
  });

  let url = "https://mnral.com";

  if (args.search) {
    url = `${url}/notes?search=${encodeURIComponent(args.search)}`;
  }

  mainWindow.webContents.on("will-navigate", (e, destinationUrl) => {
    const isInternal =
      destinationUrl.startsWith("/") ||
      destinationUrl.match("https://mnral.com");
    if (!isInternal) {
      e.preventDefault();
      require("electron").shell.openExternal(destinationUrl);
    }
  });

  mainWindow.loadURL(url);

  // let win = BrowserWindow.getAllWindows()[0];

  // If reduced below Minimum value
  // Error - 'zoomFactor' must be a double greater than 0.0
  mainWindow.webContents.setZoomFactor(1.0);

  // Upper Limit is working of 500 %
  mainWindow.webContents
    .setVisualZoomLevelLimits(1, 5)
    .then(console.log("Zoom Levels Have been Set between 100% and 500%"))
    .catch((err) => console.log(err));

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
}

app.on("ready", createWindow);
