angular
	.module('node-tests', []);

angular
	.module('node-tests')
	.component('root', {
		templateUrl: 'root.html',
		controller: class RootComponent {
			constructor($timeout, socketService) {
				this.$timeout = $timeout;
				this.socket = socketService.connect('10.242.10.82:8080');
				console.log(socketService);
				console.log(this.socket);
				console.log(io);
			}

			$onInit() {

				this.socket.on('connect', () => {
					const nickname = prompt('Nickname:');
					this.socket.emit('join', nickname);
				});

				this.socket.on('logs', (message) => {
					this.$timeout(this.log.push(message),1);
					if(this.log.length > 16) {
						this.log.splice(0,1);
					}
					console.log(message);
				});

				this.log = [];

			}

			submit() {
				const message = this.input;
				this.input = '';
				this.socket.emit('messages', message);
			}

			asciiArt(art) {
				this.socket.emit('asciiArt', art);
			}

		}
	})