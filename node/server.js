var express    =    require('express');
var fs = require ('fs');
var app        =    express();
var server = require('http').createServer (app);

require('./router/main')(app);
app.set('views',__dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
	
app.use(express.static(__dirname + '/public'));
	
server.listen (3000);
console.log("Express is running on port 3000");