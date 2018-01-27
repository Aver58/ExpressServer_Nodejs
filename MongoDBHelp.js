function mongoDB (){
    // 要在 MongoDB 中创建一个数据库，首先我们需要创建一个 MongoClient 对象，
    // 然后配置好指定的 URL 和 端口号。 
    // 如果数据库不存在，MongoDB 将创建数据库并建立连接。
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/Aver3";//数据库为 aver3
    var dbase;

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        console.log("数据库已连接!");
        var dbase = db.db("Aver3");//创建数据库
    });

    //创建集合
    this.test = function(){
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            console.log("数据库已连接!");
            var dbase = db.db("Aver3");//创建数据库
        dbase.createCollection('userInfo', function (err, res) {//创建表
            if (err) throw err;
            console.log("创建集合!");
            db.close();
          });
        });
        dbase.collection('userInfo').insert({"name":"aaa"},function(err,result){
            if(err){console.log('Error:'+ err);return;}  
            callback(result);
        });
    }
    //插入数据
    this.Insert = function(data){

        var insertData = function(db, callback) {  
            //连接到表 userInfo
            var collection = db.Collection('userInfo');//这个方法！！！
            //插入数据
            var data = [{"name":"菜鸟教程","url":"www.runoob.com"},
                        {"name":"菜鸟工具","url":"c.runoob.com"}];
            collection.insert(data, function(err, result) { 
                if(err){console.log('Error:'+ err);return;}  
                callback(result);
            });
        }
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            console.log("连接成功！");
            insertData(db, function(result) {
                console.log(result);
                db.close();
            });
        });
    }


}
module.exports = mongoDB;