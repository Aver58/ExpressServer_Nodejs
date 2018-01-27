function SQL(){

    var mysql      = require('mysql');
    var connection = mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      password : 'op90--',
      database : 'aver3'
    });
    
    // connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    //   if (error) throw error;
    //   console.log('The solution is: ', results[0].solution);
    // });

    //查
    this.Select = function(cmd) {
        connection.connect();
        // var  sql = 'SELECT * FROM userinfo';
        var  sql = cmd;
        connection.query(sql,function (err, result) {
            if(err){
              console.log('[SELECT ERROR] - ',err.message);
              return;
            }
        
           console.log('--------------------------SELECT----------------------------');
           console.log(result);
           console.log('------------------------------------------------------------\n\n');  
        });
        connection.end();
    }

    //增
    this.Insert = function(data) {
        connection.connect();
        var  addSql = 'INSERT INTO websites(Id,name,password,time) VALUES(0,?,?,?,)';
        // var  addSqlParams = ['菜鸟工具', 'https://c.runoob.com','23453', 'CN'];
        var  addSqlParams = data;
        connection.query(addSql,addSqlParams,function (err, result) {
                if(err){
                 console.log('[INSERT ERROR] - ',err.message);
                 return;
                }        
            
               console.log('--------------------------INSERT----------------------------');
               //console.log('INSERT ID:',result.insertId);        
               console.log('INSERT ID:',result);        
               console.log('-----------------------------------------------------------------\n\n');  
        });
        connection.end();
    }

    //改
    this.Update = function() {
        connection.connect();
        var modSql = 'UPDATE websites SET name = ?,url = ? WHERE Id = ?';
        var modSqlParams = ['菜鸟移动站', 'https://m.runoob.com',6];
        
        connection.query(modSql,modSqlParams,function (err, result) {
         if(err){
               console.log('[UPDATE ERROR] - ',err.message);
               return;
        }        
        console.log('--------------------------UPDATE----------------------------');
        console.log('UPDATE affectedRows',result.affectedRows);
        console.log('-----------------------------------------------------------------\n\n');
        });
        connection.end();
    }
    
    //删
    this.Delete = function() {
        connection.connect();
        var delSql = 'DELETE FROM websites where id=6';
        
        connection.query(delSql,function (err, result) {
            if(err){
              console.log('[DELETE ERROR] - ',err.message);
              return;
            }        
        
           console.log('--------------------------DELETE----------------------------');
           console.log('DELETE affectedRows',result.affectedRows);
           console.log('-----------------------------------------------------------------\n\n');  
        });
        connection.end();
    }
    //验证登录
    this.Authenticator = function(data){
        var name = data.userName;
        var password = data.password;

    }
}
module.exports = SQL;
