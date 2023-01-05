const path = require('path')
const express = require('express')
const morgan = require('morgan')
const ws = require('ws')
const websockets = require('./websockets')

const app = express();

const wsServer = new ws.Server({ noServer: true });
wsServer.on('connection', websockets.new_connection);
setInterval(websockets.heart_beat, 10000);

app.use(morgan('tiny'));
app.use(express.static('build'));

app.use('/api/v0', require('./api').router)

const PORT = parseInt(process.env.PORT || "8000");
const server = app.listen(PORT);
server.on('upgrade', (request, socket, head) => {
    wsServer.handleUpgrade(request, socket, head, socket => {
      wsServer.emit('connection', socket, request);
    });
  });

console.log(`server started: http://localhost:${PORT}`);

