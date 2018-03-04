const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const router = express.Router();
const ioManager = require('./socket.js');
const api = require('./api/routes.js')

app.use(express.static('../Front'));
app.use('/api', api)

ioManager.init(io);
io.on('connection', ioManager.handleSocket);

const port = process.env.ALWAYSDATA_HTTPD_PORT || 3000;
const ip = process.env.ALWAYSDATA_HTTPD_IP || '0.0.0.0';
http.listen(port, ip, function(){
    console.log('listening on *:' + port);
});
