var express    =    require('express');
var fs = require ('fs');
var app        =    express();
var server = require('http').createServer (app);

require('./router/main')(app);
app.set('views',__dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

/*
//Test serving static file
app.configure(function(){
	app.use('/media', express.static(__dirname + '/media'));
	app.use(express.static(__dirname + '/views'));
});
*/
	
//Test serving static file
app.get('/', function (req, res){
	console.log ('GET /');
	res.render('index.html',{name:my_name, power:my_power});
	});
	
app.use(express.static(__dirname + '/public'));
	
server.listen (3000);
console.log("Express is running on port 3000");
