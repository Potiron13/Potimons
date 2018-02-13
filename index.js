var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var listPlayer = [];

app.use(express.static(__dirname));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });

  socket.on('go online', function(user){
      io.emit('go online', user);
  });

  socket.on('disconnect', function(user){
      io.emit('user disconnected', user);
  });

  socket.on('start duel', function(data) {
      listPlayer = [];
      for (var i = 0; i <  data.userChallenged.equipe.length; i++) {
          listPlayer.push(data.userChallenged.equipe[i]);
      }
      for (var i = 0; i < data.userChallenging.equipe.length; i++) {
          listPlayer.push(data.userChallenging.equipe[i]);
      }
      data.listPlayer = listPlayer;
      io.emit('start duel', data);
  });

  socket.on('action', function(data) {      
      io.emit('action', data);
  })

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
