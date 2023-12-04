const { app, BrowserWindow, screen } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;

    mainWindow = new BrowserWindow({
        title: "ChatGPT Desktop",
        icon: path.join(__dirname, '../img/icon.png'),
        width: width,
        height: height,
        webPreferences: {
            nodeIntegration: true
        },
        frame: true,
        autoHideMenuBar: true
    });
    mainWindow.loadFile(path.join(__dirname, 'index.html'));
    mainWindow.maximize();
    mainWindow.on('closed', function () {
        mainWindow = null;
    });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
    if (mainWindow === null) createWindow();
});
