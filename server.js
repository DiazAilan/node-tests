const http = require('http');
const express = require('express');
const app = express();
const path = require('path');
const server = http.createServer(app);
const io = require('socket.io')(server);

io.on('connection', (client) => {

	client.on('join', (nickname) => {
		client.nickname = nickname;
		const fullMessage = nickname + ' has joined';
		client.emit('logs', fullMessage);
		client.broadcast.emit('logs', fullMessage);
		console.log(fullMessage);
	});

	client.on('messages', (message) => {
		const fullMessage = client.nickname + ': ' + message;
		client.emit('logs', fullMessage);
		client.broadcast.emit('logs', fullMessage);
		console.log(fullMessage);
	})

	client.on('cat', () => {
		const cat = ` 
		 /|     /|
		{  '---'  }
		{  O   O  }
		~~>  V  <~~
		 |   |/  /
		  '-----'____
		  /     |    |_
		 {       }|  )_|_   _
		 |  |_/  |/ /  |_|_/ )
		  |__/  /(_/     |__/
		    (__/`
    	client.emit('logs', cat);
    	client.broadcast.emit('logs', cat);
    	console.log(cat);
	});
});

app.use('/', express.static(path.join(__dirname, '')))

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

server.listen(8080);