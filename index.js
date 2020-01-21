electron  = require('electron');
const {app, BrowserWindow, Menu, ipcMain} = electron;
let mainWindow;
let addWindow;


app.on('ready', () => {
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        }});
    mainWindow.loadURL(`file://${__dirname}/main.html`);
    mainWindow.on('closed', () => app.quit());

    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);
});

ipcMain.on('on-add-todo', (event, todo) => {
    mainWindow.webContents.send('on-add-todo',todo);
    addWindow.close();
});


function createAddWindow() {
    addWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        width: 300,
        height: 200,
        title: 'Add new Todo'
    });
    addWindow.on('closed', () => { addWindow = null; });
    addWindow.loadURL(`file://${__dirname}/add.html`);
}

const menuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Add Todo',
                click() {
                    createAddWindow();
                }
            },
            {
                label: 'Quit',
                accelerator : process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                click() {
                    app.quit();
                }
            },
        ]
    }
 ];


if(process.env.NODE_ENV !== 'production') {
    menuTemplate.push({
        label: 'View',
        submenu: [
            { role: 'reload'},
            {
            label: 'Developer Tools',
            accelerator : process.platform === 'darwin' ? 'Command+Alt+I' : 'Ctrl+Shift+I',
            click(item,focusedWindow) { focusedWindow.toggleDevTools(); }
            }
        ]
    })
}
