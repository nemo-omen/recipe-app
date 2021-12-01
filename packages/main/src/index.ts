import { app, BrowserWindow, ipcMain } from 'electron';
import { join } from 'path';
import { URL } from 'url';
import * as fs from 'fs';
const settings = require('electron-settings');

const isSingleInstance = app.requestSingleInstanceLock();

const settingsPath = join(__dirname, '../../data/preferences.json');

if (!isSingleInstance) {
  app.quit();
  process.exit(0);
}

app.disableHardwareAcceleration();

let mainWindow: BrowserWindow | null = null;
let devTools: BrowserWindow | null = null;

const createWindow = async () => {
  devTools = new BrowserWindow({ width: 400, height: 600 });

  mainWindow = new BrowserWindow({
    show: false, // Use 'ready-to-show' event to show window
    webPreferences: {
      nativeWindowOpen: true,
      preload: join(__dirname, '../../preload/dist/index.cjs'),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: true,
    },
  });

  mainWindow.title = 'Knifework';
  mainWindow.webContents.setDevToolsWebContents(devTools.webContents);

  /**
   * If you install `show: true` then it can cause issues when trying to close the window.
   * Use `show: false` and listener events `ready-to-show` to fix these issues.
   *
   * @see https://github.com/electron/electron/issues/25012
   */
  mainWindow.on('ready-to-show', () => {
    mainWindow?.show();

    if (import.meta.env.MODE === 'development') {
      mainWindow?.webContents.openDevTools({ mode: 'detach' });
      const windowBounds = mainWindow.getBounds();
      devTools.setPosition(windowBounds.x + windowBounds.width, windowBounds.y);
    }
  });

  mainWindow.on('move', () => {
    const windowBounds = mainWindow.getBounds();
    devTools.setPosition(windowBounds.x + windowBounds.width, windowBounds.y);
  });

  /**
   * URL for main window.
   * Vite dev server for development.
   * `file://../renderer/index.html` for production and test
   */
  const pageUrl =
    import.meta.env.MODE === 'development' && import.meta.env.VITE_DEV_SERVER_URL !== undefined
      ? import.meta.env.VITE_DEV_SERVER_URL
      : new URL('../renderer/dist/index.html', 'file://' + __dirname).toString();

  await mainWindow.loadURL(pageUrl);
};

app.on('second-instance', () => {
  // Someone tried to run a second instance, we should focus our window.
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.focus();
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(createWindow)
  .catch((e) => console.error('Failed create window:', e));

// Auto-updates
if (import.meta.env.PROD) {
  app
    .whenReady()
    .then(() => import('electron-updater'))
    .then(({ autoUpdater }) => autoUpdater.checkForUpdatesAndNotify())
    .catch((e) => console.error('Failed check updates:', e));
}

// IPC Events

ipcMain.on('getUserSettings', (event) => {
  const userSettings = settings.getSync('userSettings');
  console.log('userSettings: ', userSettings);
  event.sender.send('userSettingsResponse', { userSettings });
});

ipcMain.on('setUserSettings', (event, key, value) => {
  const data = { key, value };
  console.log('recieved userData: ', data);
  settings.setSync(key, value);
  console.log('settings dbMode: ', settings.getSync('dbMode'));
});
