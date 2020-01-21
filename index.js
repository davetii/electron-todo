const electron  = require('electron');
const {app, BrowserWindow, Menu} = electron;
let mainWindow;
let addWindow;


app.on('ready', () => {
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        }});
    mainWindow.loadURL(`file://${__dirname}/main.html`);
    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);
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
