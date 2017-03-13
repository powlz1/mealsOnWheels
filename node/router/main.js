module.exports = function(app)
{
	app.get('/', function (req, res){
		console.log ('GET /');
		res.render('main.ejs', {page:"index.ejs"});
	});	
	
	app.get('/index', function (req, res){
		console.log ('GET /index');
		res.render('main.ejs', {page:"index.ejs"});
	});
	
	app.get('/viewCustomers', function (req, res){
		console.log ('GET /viewCustomers');
		res.render('main.ejs', {page:"viewCustomers"});
	});
}