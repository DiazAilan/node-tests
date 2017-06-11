//io connects to my private ip; change it to localhost in case of debugging
const socket = io.connect('10.242.10.82:8080');

document.querySelector('form').addEventListener('submit', (e) => {
	e.preventDefault();
	const message = document.querySelector('input').value;
	document.querySelector('input').value = '';
	if (message !== '/cat') {
		socket.emit('messages', message);
	} else {
		socket.emit('cat');
	}
});

socket.on('connect', () => {
	const nickname = prompt('Nickname:');
	socket.emit('join', nickname);
});

socket.on('logs', (message) => {
	console.log(message);
});