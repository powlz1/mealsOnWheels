var express    =    require('express');
var app        =    express();

require('./router/main')(app);

app.use(express.static(__dirname + '/public')); 
app.set('views',__dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

var port = 3000;

var server     =    app.listen(port,function() {
    console.log("Express is running on port 3000");
});

