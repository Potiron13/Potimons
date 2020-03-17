const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const router = express.Router();
const ioManager = require('./socket.js');
const api = require('./api/routes.js');
const connection = require('./database/connection.js');

app.use(express.static('../Front'));
app.use('/api', api)

connection.init()
    .then((res) => {
        console.log('Connection success !');
    })
    .catch((err) => console.log(err))

ioManager.init(io);
io.on('connection', ioManager.handleSocket);

const port = 8100;
const ip = '127.2.83.196';
http.listen(port, ip, function () {
    console.log('listening on *:' + port);
});
