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
exports.find=(req,res) =>{
  
    
    pool.getConnection((err,Connection)=>{
        if(err) throw err;// not connected
        console.log('connected as ID '+Connection.threadId);
    let searchTerm=req.body.search;

           //User the connection
           Connection.query('SELECT * FROM USER where first_name like ?',['%' + searchTerm +'%'],(err,rows)=>{
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
exports.form=(req, res) => {
    res.render('add-user');
}
exports.former=(req, res) => {
    res.render('add-user');
}

exports.create=(req, res) => {
const {first_name,last_name,email,phone,comments}=req.body;
 
    pool.getConnection((err,Connection)=>{
        if(err) throw err;// not connected
        console.log('connected as ID '+Connection.threadId);
    let searchTerm=req.body.search;

           //User the connection
           Connection.query('INSERT INTO USER (FIRST_NAME,last_name,email,phone,comments)VALUES(?,?,?,?,?)',[first_name,last_name,email,phone,comments],(err,rows)=>{
               //when done with the connection, release it
               Connection.release();
               if(!err){
                   res.render('add-user',{alert: 'User added Successfully'});
               }
               else{
                   console.log(err)
               }
   console.log('the data from user table',rows)
           });
   
       });   
}
exports.edit=(req,res)=>{

pool.getConnection((err,Connection)=>{
    if(err) throw err;// not connected
    console.log('connected as ID '+Connection.threadId);

       //User the connection
       Connection.query('SELECT * FROM USER where id=?',[req.params.id],(err,rows)=>{
           //when done with the connection, release it
           Connection.release();
           if(!err){
               res.render('edit-user',{rows});
           }
           else{
               console.log(err)
           }
console.log('the data from user table',rows)
       });

   });
}

exports.update=(req, res) => {
    const {first_name,last_name,email,phone,comments}=req.body;
     
        pool.getConnection((err,Connection)=>{ 
            if(err) throw err;// not connected
            console.log('connected as ID '+Connection.threadId);
        let searchTerm=req.body.search;
    
               //User the connection
               Connection.query('update USER set FIRST_NAME=?,last_name=?,email=?,phone=?,comments=? where id=?',[first_name,last_name,email,phone,comments,req.params.id],(err,rows)=>{
                   //when done with the connection, release it
                   Connection.release();
                   if(!err){
                     
                    
                    pool.getConnection((err,Connection)=>{
                        if(err) throw err;// not connected
                        console.log('connected as ID '+Connection.threadId);
                    
                           //User the connection
                           Connection.query('SELECT * FROM USER where id=?',[req.params.id],(err,rows)=>{
                               //when done with the connection, release it
                               Connection.release();
                               if(!err){
                                   res.render('edit-user',{rows,alert:`${first_name} has been update.`});
                               }
                               else{
                                   console.log(err)
                               }
                    console.log('the data from user table',rows)
                           });
                    
                       });




                   }
                   else{
                       console.log(err)
                   }
       console.log('the data from user table',rows)
               });
       
           });   
    }
    exports.delete=(req,res)=>{

        pool.getConnection((err,Connection)=>{
            if(err) throw err;// not connected
            console.log('connected as ID '+Connection.threadId);
        
               //User the connection
               Connection.query('delete FROM USER where id=?',[req.params.id],(err,rows)=>{
                   //when done with the connection, release it
                   Connection.release();
                   if(!err){
                       res.redirect('/');
                   }
                   else{
                       console.log(err)
                   }
        console.log('the data from user table',rows)
               });
        
           });
        }        