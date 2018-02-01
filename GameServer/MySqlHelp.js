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

    //   pool.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
    //     if (err) throw err;
    //   });
    var pool  = mysql.createPool({
        connectionLimit : 10,
        host     : 'localhost',
        user     : 'root',
        password : 'op90--',
        database : 'aver3'
    });
    pool.on('connection', function (connection) { 
        connection.query('SET SESSION auto_increment_increment=1') 
        }); 
    pool.on('enqueue', function () { 
        console.log('Waiting for available connection slot'); 
        }); 
    // pool.end(function (err) { 
    //     // all connections in the pool have ended 
    //     }); 
    // PoolCluster 
    // 连接池集群 PoolCluster提供多个主机连接。(集团和重试和选择器)
    // function querys(sql,callback){
    //     pool.getConnection(function(err,conn){
    //         if(err){
    //             callback(err,null,null);
    //         }else{
    //             conn.query(sql,function(q_err,values,fields){
    //                 //释放连接
    //                 conn.release();
    //                 //事件驱动回调
    //                 callback(q_err,values,fields);
    //             });
    //         }
    //     });
    // };
    
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
        var s = JSON.parse(data);
        connection.connect();
        var name = s.username;
        var password = s.password;
        var  sql = 'SELECT * FROM userinfo WHERE userName = '+name;
        connection.query(sql,function (err, result) {
            if(err){
              console.log('[SELECT ERROR] - ',err.message);
              return;
            }
            if(result != null){
                // console.log('--------------------------SELECT----------------------------');
                // console.log(result);
                // console.log('------------------------------------------------------------\n\n');  
                if(password == result[0].password){
                    console.log("pass");
                    // return new Promise((resolve,reject)=>{
                    //     resolve(true);
                    // })
                    return 1;
                }
                return 2;
            }
            return 3;
        });
    }
    
    this.AsyncOperation = function(tasks){
        connection.connect();
        
        var sqls = {
            'insertSQL': 'insert into t_user(name) values("conan"),("fens.me")',
            'selectSQL': 'select * from t_user limit 10',
            'deleteSQL': 'delete from t_user',
            'updateSQL': 'update t_user set name="conan update"  where name="conan"'
        };  
        var tasks = ['deleteSQL', 'insertSQL', 'selectSQL', 'updateSQL', 'selectSQL'];
        async.eachSeries(tasks, function (item, callback) {
            console.log(item + " ==> " + sqls[item]);
            connection.query(sqls[item], function (err, result) {
                console.log(result);
                callback(err, result);
            });
        }, function (err) {
            console.log("err: " + err);
        });
    }
}
module.exports = SQL;
