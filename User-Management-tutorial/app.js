const express = require('express');
const exphbs=require('express-handlebars');
const bodyParser=require('body-parser');
const mysql = require('mysql');
const Connection = require('mysql/lib/Connection');
require('dotenv').config();
const app=express();
const port=process.env.PORT || 5000;

//parsing middleware
//parser application/x-www-form
app.use(bodyParser.urlencoded({ extended:false}));

//parse application/json
app.use(bodyParser.json());

app.use(express.static('public'));

app.engine('.hbs', exphbs.engine({ extname: '.hbs', defaultLayout: "main"}));
app.set ('view engine', 'hbs');   

//connection pool

const pool=mysql.createPool({
   connectionLimit :100,
   host            : process.env.DB_HOST,
   user :process.env.DB_USER,
   database         :process.env.DB_NAME
});
//CONNECT TO DB
pool.getConnection((err,Connection)=>{
    if(err) throw err;// not connected
    console.log('connected as ID '+Connection.threadId);
})


const routes =require('./server/routers/user');
app.use('/',routes);

// app.get('',(req,res) => {
//     res.render('home');
// });
app.listen(port, () => console.log(`Listening on port ${port}`)) 