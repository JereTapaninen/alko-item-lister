import {app, BrowserWindow} from "electron";
import {enableLiveReload} from "electron-compile";

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({width: 800, height: 600});

    mainWindow.loadFile("index.html");

    //mainWindow.webContents.openDevTools()

    mainWindow.on("closed", () => {
        mainWindow = null;
    });
}

app.on("ready", () => {
    enableLiveReload({strategy: "react-hmr"});
    createWindow();
});

app.on("window-all-closed", function () {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", function () {
    if (mainWindow === null) {
        createWindow();
    }
});
