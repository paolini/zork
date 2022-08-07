const zork = require('./zork');

var connection_count = 0;
var connections = [];

function new_connection(ws, req, client) {
    console.log("NEW CONNECTION");
    connection_count ++;
    const connection_id = connection_count;

    const connection = {
        "id": connection_id,
        "ws": ws,
        "client": client,
        "player": null,
        "world": null,
        "alive": true
    };

    connections.push(connection);

    //send immediatly a feedback to the incoming connection    
    ws.send(`CON ${connection_id}`);
    console.log(`${connection_id} CONNECTED`);

    ws.on('message', (message) => {
        console.log("--- " + message);
        if (message.startsWith("STA ")) {
            const name = message.substring(4);

            // se non c'è già un giocatore con questo nome lo creo
            var session = new zork.Session({
                output_cb: message => {
                    ws.send("OUT " + message);
                    console.log(`OUT ${connection_id}: ${message}`)
                }
            }); 
            connection.session = session;
            ws.send("PLA " + name);
            console.log(connection_id + " PLAY " + name);
        } else if (message.startsWith("CMD ")) {
            message = message.substring(4);
            connection.session.write(message);
        } else if (message.startsWith("BYE ")) {
            close_connection(connection);        
        } else {
            ws.send(`ERR invalid message: ${message}`);
        }
    });
    
    ws.on('close', (code, msg) => {
        close_connection(connection);
    });
}

function close_connection(connection) {
    // close websocket:
    if (connection.ws) connection.ws.close();
    connection.ws = null;
    console.log(`${connection.id} CLOSED`);
}

function heart_beat() {
    console.log(`heart beat [${connections.length} connections]`);
    connections.forEach(connection => {
        if (connection.alive && connection.ws) {
            connection.alive = false;
            console.log(`${connection.id} ping`);
            connection.ws.ping(() => {
                console.log(`${connection.id} pong`);
                connection.alive = true;
            });
        } else {
            close_connection(connection);
        }
    });

    // remove closed connections
    connections = connections.filter(connection => connection.ws);
}

exports.new_connection = new_connection
exports.heart_beat = heart_beat