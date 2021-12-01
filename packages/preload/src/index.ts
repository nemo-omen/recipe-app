import { contextBridge, ipcRenderer } from 'electron';

const apiKey = 'electron';
/**
 * @see https://github.com/electron/electron/issues/21437#issuecomment-573522360
 */
const api: ElectronApi = {
  versions: process.versions,
  userSettingsResponse: (channel, fn) => {
    ipcRenderer.on(channel, fn);
  },
  dbModeResponse: (channel, fn) => {
    ipcRenderer.on(channel, fn);
  },
  getUserSettings: () => ipcRenderer.send('getUserSettings'),
  setUserSettings: (key, value) => ipcRenderer.send('setUserSettings', key, value),
};

/**
 * The "Main World" is the JavaScript context that your main renderer code runs in.
 * By default, the page you load in your renderer executes code in this world.
 *
 * @see https://www.electronjs.org/docs/api/context-bridge
 */
contextBridge.exposeInMainWorld(apiKey, api);
