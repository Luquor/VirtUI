import Api from "./Api.js";


export default class WConsole {


    terminalSocketData;
    terminalSocketControl;
    xTerm;
    name;
    constructor(name) {
        this.name = name;
    }


    getWebSocket()
    {
        return this.terminalSocketData;
    }

    closeSocket(oldName)
    {
        if(this.name === oldName)
        {
            this.terminalSocketControl.close()
            this.terminalSocketData.close()
            console.log(name + " is closed");

        }
    }

    async defineTerminal(terminal)
    {
        this.xTerm = terminal
        const webSocketsUrl = await Api.getInstance().getWebSocketsConsoleURL(this.name)
        console.log(webSocketsUrl)
        this.terminalSocketData = new WebSocket('wss://127.0.0.1:8443' + webSocketsUrl.Data);
        this.terminalSocketControl = new WebSocket('wss://127.0.0.1:8443' + webSocketsUrl.Control)

        this.terminalSocketData.onopen = (function (){
            console.log('connection opened');
        });

        this.terminalSocketData.onabort = (function (){
            console.log('connection aborted');
        });




        this.terminalSocketData.onerror = (function (error){
            console.log(error)
        });

        this.terminalSocketData.binaryType = "arraybuffer";
        this.terminalSocketData.onmessage = (message) => {
            console.log(new Uint8Array(message.data))
            terminal.write(new Uint8Array(message.data));
        };



    }

}