const mysql=require('mysql');
  //connection pool
const pool=mysql.createPool({
    connectionLimit :100,
    host            : process.env.DB_HOST,
    user :process.env.DB_USER,
    database         :process.env.DB_NAME
 });
//views users
exports.view=(req, res) => {
  pool.getConnection((err,Connection)=>{
     if(err) throw err;// not connected
     console.log('connected as ID '+Connection.threadId);
 
        //User the connection
        Connection.query('SELECT * FROM USER',(err,rows)=>{
            //when done with the connection, release it
            Connection.release();
            if(!err){
                res.render('home',{rows});
            }
            else{
                console.log(err)
            }
console.log('the data from user table',rows)
        });

    });
 

}