const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path');
const { handleThemeMode } = require("./darkMode");
const fs = require("node:fs");
const https = require("node:https");

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });

    mainWindow.loadFile('index.html');

    handleThemeMode();

    mainWindow.webContents.openDevTools();
}

const iconName = path.join(__dirname, 'iconForDragAndDrop.png');
const icon = fs.createWriteStream(iconName);

fs.writeFileSync(path.join(__dirname, 'drag-and-drop-1.md'), "# First file to test drag and drop");
fs.writeFileSync(path.join(__dirname, 'drag-and-drop-2.md'), "# Second file to test drag and drop");

https.get('https://img.icons8.com/ios/452/drag-and-drop.png', response => {
    response.pipe(icon);
});

ipcMain.on('ondragstart', (event, filepath) => {
    event.sender.startDrag({
        file: path.join(__dirname, filepath),
        icon: iconName
    });
});

app.whenReady().then(createWindow);

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
