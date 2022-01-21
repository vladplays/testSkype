//'use strict';
let app = require('express')();
let io=require('socket.io')(app.listen(8080));
let data;
//let io = socket.listen(8080);

app.get('/', function(request, response){
	response.sendfile(__dirname+'/GetUserMedia.html');
});
app.get('/data1', function(request, response){
	response.send(data);
	response.end()
});
app.post('/data', function(request, response){
	request.on('data', function(d){
		/*app.get('/d', function(request, response){
			response.write(d);
		})*/
		data=d.toString();
		console.log(d.toString())
	})
	
	
});

io.sockets.on('connection', function(client){
	client.on('name', function(msg){
		console.log('Сообщение')
		io.sockets.emit('presentName',{
			msg:msg.msg,
			name:msg.name
		})
	})
	client.on('audio', function(msg){
		console.log(msg)
		client.broadcast.emit('audioMes',msg)
	})
});