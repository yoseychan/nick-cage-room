
const WebSocket = require('ws');
const server = new WebSocket.Server({port:3000});

server.on("connection", function(client) {
    console.log(client + "has connected.");
    
    client.on('message', function(resulted) {
        console.log(client + ': coordinates : ' + resulted);
        
        client.send(resulted);
    })

    client.on("client", function() {
        console.log("Client has disconnected.");
    })

})