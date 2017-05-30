module.exports = function(server)
{
	var socket = require('socket.io').listen(server);

	 socket.on('connection', function (AddUser_Server) {
		 console.log('socket connected');
	 });

	return socket;
}