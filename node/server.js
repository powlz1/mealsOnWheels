var express = require('express');
var fs = require ('fs');
var app = express();

var server = require('http').createServer (app);

//<**PASSPORT - SESSIONS**>
//defining passport and using express to set up sessions
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var db = require('./db');
// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
//</**PASSPORT - SESSIONS**>

var exports = module.exports = {};
var Sequelize  =    require('sequelize');
var mysql 	   = 	require('mysql');
var orm 	   =  	require('./orm.js');
var bodyParser = 	require('body-parser');
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({
	extended: true
}));

//initialising javascript - http://docs.sequelizejs.com/en/v3/docs/getting-started/
var sequelize = new Sequelize('mow', 'root', '1234', {
  host: 'localhost',
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

var user = sequelize.define('user',orm.User);
var customer = sequelize.define('customer',orm.Customer);
var customerDay = sequelize.define('customerDay',orm.CustomerDay);
var mrCategory = sequelize.define('MRcategory',orm.MealRequirementCategory);
var mealR = sequelize.define('mealR',orm.MealRequirement);

//<**PASSPORT - SESSIONS**>
// Configure the local strategy for use by Passport.
//
// The local strategy require a `verify` function which receives the credentials
// (`username` and `password`) submitted by the user.  The function must verify
// that the password is correct and then invoke `cb` with a user object, which
// will be set at `req.user` in route handlers after authentication.
passport.use(new Strategy(
  function(username, password, cb) {
    db.users.findByUsername(username, function(err, user) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      if (user.password != password) { return cb(null, false); }
      return cb(null, user);
    });
  }));
// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.
passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});
passport.deserializeUser(function(id, cb) {
  db.users.findById(id, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});
// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());
//</**PASSPORT - SESSIONS**>


mrCategory.hasMany(mealR);
mealR.belongsTo(mrCategory);

var customerMR =  sequelize.define('customerMR',orm.CustomerMealRequirement);
var driver = sequelize.define('driver',orm.Driver);
var staff = sequelize.define('staff',orm.Staff);

var tableCreate=true;

user.sync();
customer.sync();
customerDay.sync();
mrCategory.sync(); 
mealR.sync();
customerMR.sync(); 
driver.sync();
staff.sync();

exports.user = user;
exports.customer = customer;
exports.mrCategory = mrCategory;
exports.mealR = mealR;

require('./router/main')(app);

app.use(express.static(__dirname + '/public')); 
app.set('views',__dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
	
var server = app.listen(3000,function(){
    console.log("Express is running on port 3000");
});
