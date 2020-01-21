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
    mainWindow.on('closed', () => app.quit());

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


if(process.env.NODE_ENV !== 'production') {
    menuTemplate.push({
        label: 'View',
        submenu: [{
            label: 'Developer Tools',
            accelerator : 'Ctrl+Shift+J',
            click(item,focusedWindow) {
                focusedWindow.toggleDevTools();
            }
        }]
    })
}
