angular
	.module('node-tests')
	.service('socketService', class socketService {
		constructor() {

		}

		//io connects to my private ip; change it to localhost in case of debugging
		connect() {
			return io.connect('10.242.10.82:8080');
		}
		
	})