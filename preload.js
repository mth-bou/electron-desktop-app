const { contextBridge, ipcRenderer } = require('electron');
const path = require('node:path');

// allow communication between render process and main process (which using Node.js)
// These 2 processes are independent and can communicate only with this bridge
contextBridge.exposeInMainWorld('versions', {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
});

contextBridge.exposeInMainWorld('darkMode', {
    toggle: () => ipcRenderer.invoke('dark-mode:toggle'),
    system: () => ipcRenderer.invoke('dark-mode:system')
});

contextBridge.exposeInMainWorld('electron', {
    startDrag: (filename) => ipcRenderer.send('ondragstart', filename)
});
