import { contextBridge, ipcRenderer } from 'electron';

const apiKey = 'electron';
/**
 * @see https://github.com/electron/electron/issues/21437#issuecomment-573522360
 */
const api: ElectronApi = {
  // 'electron',
  versions: process.versions,
  send: (data) => ipcRenderer.send('toMain', data),
  fromMain: (channel, fn) => {
    ipcRenderer.on(channel, fn);
  },
  getData: (request) => ipcRenderer.send('request', request),
  dataResponse: (channel, fn) => {
    ipcRenderer.on(channel, fn);
  },
};

/**
 * The "Main World" is the JavaScript context that your main renderer code runs in.
 * By default, the page you load in your renderer executes code in this world.
 *
 * @see https://www.electronjs.org/docs/api/context-bridge
 */
contextBridge.exposeInMainWorld(apiKey, api);
