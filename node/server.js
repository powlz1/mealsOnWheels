var express = require('express');
var fs = require ('fs');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static(__dirname + '/public')); 
app.set('views',__dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
	
var server = app.listen(3000,function(){
    console.log("Express is running on port 3000");
});

var socket = require('./socket.js')(server);
 
require('./router/main')(app, socket);

