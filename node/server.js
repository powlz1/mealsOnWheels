var express    =    require('express');
var fs = require ('fs');
var app        =    express();
var server = require('http').createServer (app);

require('./router/main')(app);
app.set('views',__dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
	
//Test serving static file
app.get('/index', function (req, res){
	console.log ('GET /index');
	res.render('main.ejs');
	});
	
app.get('/about', function (req, res){
	console.log ('GET /about');
	res.render('about.html');
	});
	
app.use(express.static(__dirname + '/public'));
	
server.listen (3000);
console.log("Express is running on port 3000");