var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var listPlayer = [];
var allClients = [];

app.use(express.static(__dirname));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){

    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
    });

    socket.on('go online', function(user){
        var client = {socket : socket, user: user, enDuel : false};
        allClients.push(client);
        io.emit('all users', allClients.filter(x=>x.enDuel == false).map(x=>x.user));
    });

    socket.on('duel query', function(data){
        var challengedClient = allClients.find(x=>x.user.id == data.userChallenged.id);
        challengedClient.socket.emit('duel query', data);
    });

    socket.on('update team', function(data) {
        var userClient = allClients.find(x=>x.user.id == data.userId);
        if (userClient) {
            userClient.user.equipe = data.equipe;
            if (data.nextUserId) {
                var nextClient = allClients.find(x=>x.user.id == data.nextUserId);
                nextClient.socket.emit('update query', data.userId);
            }else {
                userClient.socket.emit('update complete', data.previousUserId);
            }
        }
    });

    socket.on('start duel', function(data) {
        var challengedClient = allClients.find(x=>x.user.id == data.userChallengedId);
        var challengingClient = allClients.find(x=>x.user.id == data.userChallengingId);
        listPlayer = [];
        for (var i = 0; i <  challengedClient.user.equipe.length; i++) {
            listPlayer.push(challengedClient.user.equipe[i]);
        }
        for (var i = 0; i < challengingClient.user.equipe.length; i++) {
            listPlayer.push(challengingClient.user.equipe[i]);
        }
        data.listPlayer = listPlayer;
        challengedClient.enDuel = true;
        challengingClient.enDuel = true;
        var room = challengedClient.socket.id + challengingClient.socket.id;
        data.room = room
        challengedClient.socket.join(room);
        challengingClient.socket.join(room);
        io.to(room).emit('start duel', data);
        io.emit('all users', allClients.filter(x=>x.enDuel == false).map(x=>x.user));
    });

    socket.on('end duel', function(data){
        var leavingDuelClient = allClients.find(x=>x.user.id == data.userLeavingDuel);
        leavingDuelClient.enDuel = false;
        io.emit('all users', allClients.filter(x=>x.enDuel == false).map(x=>x.user));
    })

    socket.on('action', function(data) {
        io.to(data.room).emit('action', data);
    });

    socket.on('disconnect', function() {
      var index = allClients.map(x=>x.socket).indexOf(socket);
      if (index !== -1) {
          allClients.splice(index, 1);
      }
   });

});

var port = process.env.ALWAYSDATA_HTTPD_PORT || 3000;
var ip = process.env.ALWAYSDATA_HTTPD_IP || '0.0.0.0';
http.listen(port, ip, function(){
    console.log('listening on *:' + port);
});
