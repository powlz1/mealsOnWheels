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
	
	app.post('/addCustomers', function (req, res){
		console.log(req.body);
		console.log ('POST /addCustomers');
		res.render('main.ejs', {page:"addCustomers"});
	});
	
	app.get('/addCustomers', function (req, res){
		console.log ('GET /addCustomers');
		res.render('main.ejs', {page:"addCustomers"});
	});
}