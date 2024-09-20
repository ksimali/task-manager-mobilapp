const WebSocket = require('ws');

const wss = new WebSocket.Server({port: 8081});

let clients = [];

const broadcastMessage = (data) => {
    clients.forEach( client => {
        if(client.readyState === WebSocket.OPEN){
            client.send(JSON.stringify(data));
        }
    });
};

wss.on('connection', (ws) => {
    console.log("Client Connected!");
    clients.push(ws);

    ws.on('message', (message) => {
        console.log("Received message: " + message);
        broadcastMessage(JSON.parse(message));
    });

    ws.on('close', ()=>{
        console.log("Client Disconnected!");
        clients = clients.filter(client => client !== ws)
    });
});