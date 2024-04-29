const information = document.getElementById('info');
information.innerText = `Cette application utilise Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), Electron (v${versions.electron()})`;

// DarkMode
document.getElementById('toggle-dark-mode').addEventListener('click', async () => {
    const isDarkMode = await window.darkMode.toggle();
    document.getElementById('theme-source').innerHTML = isDarkMode ? 'Dark' : 'Light';
});

document.getElementById('reset-to-system').addEventListener('click', async () => {
    await window.darkMode.system();
    document.getElementById('theme-source').innerHTML = 'System';
});

document.getElementById('drag').ondragstart = (event) => {
    event.preventDefault();
    window.electron.startDrag('drag-and-drop-1.md');
};
