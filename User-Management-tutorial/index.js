var express = require('express')
  , routes = require('./routes')
  , path = require('path'),
	fileUpload = require('express-fileupload'),
	app = express(),
	mysql      = require('mysql'),
	bodyParser=require("body-parser");
	
var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	
	database : 'usermanagement_ful'
});
const exphbs=require('express-handlebars');
connection.connect();
 
global.db = connection;
 
// all environments
app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/views');
//app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());
app.engine('.hbs', exphbs.engine({ extname: '.hbs', defaultLayout: "main"}));
app.set ('view engine', 'hbs'); 
const port=process.env.PORT || 5000;
 
// development only
 
app.get('/', routes.view);//call for main index page
//app.post('/', routes.index);//call for signup post 
app.get('/profile/:id',routes.profile);
app.get('/',routes.view);
app.post('/',routes.find);
app.post('/adduser',routes.index);
app.get('/adduser',routes.form);


app.get('/:id',routes.delete);
app.get('/edituser/:id',routes.edit)
app.post('/edituser/:id',routes.update)
//Middleware
app.listen(8080)
app.listen(port, () => console.log(`Listening on port ${port}`)) 