var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
   res.sendfile('index.html');
});

users = [];
io.on('connection', function(socket) {
   console.log('A user connected');
   socket.on('setUsername', function(data) {
      console.log(data);
      
      if(users.indexOf(data) > -1) {
         socket.emit('userExists', data + ' username is taken! Try some other username.');
      } else {
         users.push(data);
         socket.emit('userSet', {username: data});
      }
   });
   
   socket.on('msg', function(data) {
      //Send message to everyone
      io.sockets.emit('newmsg', data);
   })
});

http.listen(3000, function() {
   console.log('listening on localhost:3000');
});

/*
Testing code
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

//using express
app.get('/',function(req,res){
	res.sendFile('index.html');
});
//check whether user connected or not
io.on('connection',function(socket){
	console.log('A user connected');

	//Sending data to client
	socket.emit('testerEvent', { description: 'A custom event named testerEvent!'});

	
	recieving data from client
	socket.on('clientEvent', function(data) {
      console.log(data);
   });
	socket.on('disconnected',function(){
		console.log('A user disconnected');		
	})
})
http.listen(3000,function(){
	console.log('listening...')
})*/


